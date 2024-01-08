const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await pool.query("SELECT * FROM applications");
    res.json(applications.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get application title by ID
router.get("/applications/title/:applicationId", async (req, res) => {
  const { applicationId } = req.params;

  try {
    const titleResult = await pool.query(
      "SELECT field_value FROM application_content WHERE application_id = $1 AND field_name = 'ResearchProject'",
      [applicationId]
    );

    if (titleResult.rows.length === 0) {
      return res.status(404).json({ error: "Title not found for the specified application ID" });
    }

    const title = titleResult.rows[0].field_value;
    res.json({ title });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to fetch application content by application ID
router.get("/applications/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const applicationQuery = await pool.query(
      "SELECT * FROM applications WHERE id = $1",
      [id]
    );

    const application = applicationQuery.rows[0];

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    const contentQuery = await pool.query(
      "SELECT * FROM application_content WHERE application_id = $1",
      [id]
    );

    const content = contentQuery.rows.reduce((acc, row) => {
      acc[row.field_name] = row.field_value;
      return acc;
    }, {});

    // Combine application data and content data
    const applicationData = {
      ...application,
      application_content: content,
    };

    res.json(applicationData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Add a new application
router.post("/applications/add", async (req, res) => {
  try {
    const { userID, values } = req.body;
    console.log("Received userID:", userID);

    // Insert application
    const newApplication = await pool.query(
      `
      INSERT INTO applications (status, date, applicant_id) 
      VALUES ($1, $2, $3) 
      RETURNING *;
      `,
      ["Pending supervisor's admission ", new Date(), userID]
    );

    const applicationId = newApplication.rows[0].id;

    // Find supervisor's user_id using the email
    const supervisorEmail = values.supervisor; 
    const supervisorUser = await pool.query(
      `
      SELECT user_id FROM users WHERE email = $1;
      `,
      [supervisorEmail]
    );

    if (supervisorUser.rows.length === 0) {
      // Handle the case where the supervisor's email is not found
      res.status(400).json({ success: false, error: "Supervisor not found" });
      return;
    }

    const supervisorUserId = supervisorUser.rows[0].user_id;

    // Insert into user_roles
    const assignSupervisor = await pool.query(
      `
      INSERT INTO user_roles (user_id, role, application_id)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [supervisorUserId, 'supervisor', applicationId]
    );

    // Insert application content
    const contentEntries = Object.entries(values);

    for (const [fieldName, fieldValue] of contentEntries) {
      if (
        !(
          fieldValue === "" ||
          (Array.isArray(fieldValue) && fieldValue.length === 0)
        )
      ) {
        await pool.query(
          `
          INSERT INTO application_content (application_id, field_name, field_value) 
          VALUES ($1, $2, $3);
          `,
          [applicationId, fieldName, fieldValue]
        );
      }
    }

    res.json({ success: true, applicationId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



router.post("/applications/update-status/:id", async (req, res) => {
  const { id } = req.params;
  var status = req.body.status;
  const userID = req.body.user.id;

  try {
    //fetch status of application with id
    const fetchStatusQuery = `
      SELECT status FROM applications WHERE id = $1
    `;
    const fetchStatus = await pool.query(fetchStatusQuery, [id]);
    const currentStatus = fetchStatus.rows[0].status; //100%
    console.log(currentStatus);

    if (currentStatus === "Approved") {
      return res.json({
        success: false,
        message: "Application is already approved, do you wish to delete it?",
      });
    }

    //fetch user role in application with user_id
    const fetchUserIDQuery = `
      SELECT user_id from users WHERE google_id = $1
    `;
    const fetchUserID = await pool.query(fetchUserIDQuery, [userID]);
    const userId = fetchUserID.rows[0].user_id;
    console.log(userId);
    const fetchUserRole = `
      SELECT role FROM user_roles WHERE user_id = $1 AND application_id = $2
    `;
    const fetchRole = await pool.query(fetchUserRole, [userId, id]);
    const userRole = fetchRole.rows[0].role; //100%
    console.log(userRole);

    if (userRole === "supervisor") {
      if (currentStatus === "Pending supervisor's admission ") {
        if(status === "Approved"){
          status = "Approved by supervisor, pending reviewers addition"
        }
      }
      if (currentStatus === "Approved by supervisor, pending reviewers addition") {
          return res.json({
            success: false,
            message:
              "Application is already approved by you, it's time for the reviewers to review.",
          });
      }
    }
    if(userRole === "reviewer"){
      if (currentStatus ==="Reviewers Assigned"){
        if(status ==="Approved"){
          status = "Approved by reviewer, pending ethics admin's approval"
        }
      }
      if (currentStatus === "Approved by reviewer, pending ethics admin's approval"){
        return res.json({
          success: false,
          message:
            "Application is already approved by you, it's time for the admins to review.",
        });
      }
    }

    const updateStatusQuery = `
      UPDATE applications
      SET status = $1, date = $2 -- Add other columns if needed
      WHERE id = $3
      RETURNING *;
    `;
    const currentDate = new Date(); // Get the current date
    const updatedApplication = await pool.query(updateStatusQuery, [
      status,
      currentDate,
      id,
    ]);

    res.json({ success: true, updatedApplication: updatedApplication.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete an application
router.delete("/applications/delete/:applicationId", async (req, res) => {
  try {
    const { applicationId } = req.params;

    // Delete user_roles
    const deleteUserRoles = await pool.query(
      `
      DELETE FROM user_roles
      WHERE application_id = $1
      RETURNING *;
      `,
      [applicationId]
    );

    // Delete application_content
    const deleteApplicationContent = await pool.query(
      `
      DELETE FROM application_content
      WHERE application_id = $1;
      `,
      [applicationId]
    );

    // Delete comments
    const deleteComments = await pool.query(
      `
      DELETE FROM comments
      WHERE application_id = $1
      RETURNING *;
      `,
      [applicationId]
    );

    // Delete from applications
    const deleteApplication = await pool.query(
      `
      DELETE FROM applications
      WHERE id = $1
      RETURNING *;
      `,
      [applicationId]
    );

    if (deleteApplication.rows.length === 0) {
      // Handle the case where the application ID is not found
      res.status(404).json({ success: false, error: "Application not found" });
      return;
    }

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
