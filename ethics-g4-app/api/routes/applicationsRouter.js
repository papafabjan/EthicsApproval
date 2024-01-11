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
      return res
        .status(404)
        .json({ error: "Title not found for the specified application ID" });
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
      ["Pending supervisor's admission", new Date(), userID]
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
      [supervisorUserId, "supervisor", applicationId]
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
    var userRole = "none";

    if (fetchRole.rows.length > 0) {
      const roleFromDb = fetchRole.rows[0].role;
      if (fetchRole.rows.length > 1) { //if more than 1 roles for the same user on the same application he can only be a reviewer attempting to approve.
        userRole = "reviewer";
      } else {
          userRole = roleFromDb;
      }
    }
    console.log(userRole);
    var isAdmin = false;
    //keeping it in case the admin attempts to bypass states
    const isAdminQuery = await pool.query(
      "SELECT role FROM user_roles WHERE role = 'admin' AND user_id = $1",
      [userId]
    );
    if (isAdminQuery.rows.length > 0) {
      isAdmin = isAdminQuery.rows[0].role === "admin";
    }
    console.log(isAdmin);

    if (currentStatus === "Approved") {
      return res.json({
        success: false,
        message: "Application is already approved",
      });
    }
    if (userRole === "none"){
      if (
        currentStatus ===
        "Approved by reviewer, pending ethics admin's approval"
      ) {
        const updateStatusQuery =
          "UPDATE applications SET status = $1, date = $2 WHERE id = $3 RETURNING *";
        const currentDate = new Date();
        const updatedApplication = await pool.query(updateStatusQuery, [
          status,
          currentDate,
          id,
        ]);
        return res.json({
          success: true,
          message: "Successful Approval",
        });
      } else {
        return res.json({
          success: false,
          message:
            "You cannot approve an application until it has gone through the correct process",
        });
      }
    }
    if (userRole === "supervisor" && isAdmin) {
      if (currentStatus === "Pending supervisor's admission") {
        status = "Approved by supervisor, pending reviewers addition";
      } else {
        if (
          currentStatus ===
          "Approved by reviewer, pending ethics admin's approval"
        ) {
          const updateStatusQuery =
            "UPDATE applications SET status = $1, date = $2 WHERE id = $3 RETURNING *";
          const currentDate = new Date();
          const updatedApplication = await pool.query(updateStatusQuery, [
            status,
            currentDate,
            id,
          ]);
          return res.json({
            success: true,
            message: "Successful Approval",
          });
        } else {
          return res.json({
            success: false,
            message:
              "You cannot approve an application until it has gone through the correct process",
          });
        }
      }
    }

    if (userRole === "reviewer" && isAdmin) {
      if (currentStatus === "Reviewers Assigned") {
        status = "Approved by reviewer, pending ethics admin's approval";
      } else {
        if (
          currentStatus ===
          "Approved by reviewer, pending ethics admin's approval"
        ) {
          const updateStatusQuery =
            "UPDATE applications SET status = $1, date = $2 WHERE id = $3 RETURNING *";
          const currentDate = new Date();
          const updatedApplication = await pool.query(updateStatusQuery, [
            status,
            currentDate,
            id,
          ]);
          return res.json({
            success: true,
            message: "Successful Approval",
          });
        } else {
          return res.json({
            success: false,
            message:
              "You cannot approve an application until it has gone through the correct process",
          });
        }
      }
    }

    if (userRole === "supervisor") {
      if (currentStatus === "Pending supervisor's admission") {
          status = "Approved by supervisor, pending reviewers addition";
      } else {
          return res.json({
            success: false,
            message:
              "Application is already approved by you, it's time for the reviewers to review.",
          });
      }
    }
    if (userRole === "reviewer") {
      if (currentStatus === "Reviewers Assigned") {
          status = "Approved by reviewer, pending ethics admin's approval";
      }
      if (
        currentStatus ===
        "Approved by reviewer, pending ethics admin's approval"
      ) {
        return res.json({
          success: false,
          message:
            "Application is already approved by you, it's time for the admins to review.",
        });
      }
    }

    const updateStatusQuery = `
      UPDATE applications
      SET status = $1, date = $2
      WHERE id = $3
      RETURNING *;
      `;
    const currentDate = new Date(); // Get the current date
    const updatedApplication = await pool.query(updateStatusQuery, [
      status,
      currentDate,
      id,
    ]);

    res.json({ success: true, message: "Successful Approval" });
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

//edit application
router.post("/applications/edit/:applicationId", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const userID = req.body.user.id;
    const values = req.body.application;
    const fetchUserIDQuery = `
      SELECT user_id from users WHERE google_id = $1
      `;
    const fetchUserID = await pool.query(fetchUserIDQuery, [userID]);
    const userId = fetchUserID.rows[0].user_id;
    // Find the existing application
    const existingApplication = await pool.query(
      `
    SELECT * FROM applications WHERE id = $1;
    `,
      [applicationId]
    );

    if (existingApplication.rows.length === 0) {
      // Handle the case where the application is not found
      res.status(404).json({ success: false, error: "Application not found" });
      return;
    }

    // Update the application in the `applications` table
    const updateApplication = await pool.query(
      `
    UPDATE applications 
    SET status = $1, date = $2, applicant_id = $3
    WHERE id = $4
    RETURNING *;
    `,
      ["Pending supervisor's admission", new Date(), userId, applicationId]
    );

    // Find the supervisor's user_id using the email
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

    // Delete the previous supervisor from the `user_roles` table
    await pool.query(
      `
    DELETE FROM user_roles
    WHERE application_id = $1 AND role = 'supervisor';
    `,
      [applicationId]
    );

    // Insert the new supervisor into the `user_roles` table
    const assignSupervisor = await pool.query(
      `
    INSERT INTO user_roles (user_id, role, application_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
      [supervisorUserId, "supervisor", applicationId]
    );

    // Update the application content in the `application_content` table
    const contentEntries = Object.entries(values);

    for (const [fieldName, fieldValue] of contentEntries) {
      if (
        fieldValue === "" ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      ) {
        // Delete the field from the `application_content` table if the value is empty
        await pool.query(
          `
        DELETE FROM application_content
        WHERE application_id = $1 AND field_name = $2;
        `,
          [applicationId, fieldName]
        );
      } else {
        // Check if the field already exists in the `application_content` table
        const existingField = await pool.query(
          `
        SELECT * FROM application_content
        WHERE application_id = $1 AND field_name = $2;
        `,
          [applicationId, fieldName]
        );

        if (existingField.rows.length === 0) {
          // Insert the new field into the `application_content` table
          await pool.query(
            `
          INSERT INTO application_content (application_id, field_name, field_value) 
          VALUES ($1, $2, $3);
          `,
            [applicationId, fieldName, fieldValue]
          );
        } else {
          // Update the existing field in the `application_content` table
          await pool.query(
            `
    UPDATE application_content
    SET field_value = $3
    WHERE application_id = $1 AND field_name = $2;
    `,
            [applicationId, fieldName, fieldValue]
          );
        }
      }
    }

    res.json({ success: true, applicationId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
