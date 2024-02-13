const express = require("express");
const router = express.Router();
const pool = require("../db");
const send_mail = require("../gmailApi");

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

    const applicantInfo = await pool.query(
      `
        SELECT username, email, user_id FROM users WHERE user_id = $1;
        `,
      [userID]
    );


    const supervisorInfo = await pool.query(
      `
        SELECT username FROM users WHERE email = $1;
        `,
      [supervisorEmail]
    );



    // Extracting names and emails from the query result for applicant
    const applicantName = applicantInfo.rows[0].username;
    const applicantEmail = applicantInfo.rows[0].email;
    const supervisorName = supervisorInfo.rows[0].username;


    const recipientNames = [applicantName, supervisorName];
    const recipientEmails = [applicantEmail, supervisorEmail];
    const recipientTypes = ["applicant", "supervisor"];
    const status = "Pending supervisor's admission";
    var subjects = ["Your application has been submitted", "You have been assigned as a supervisor"]
    const applicant_id = applicantInfo.rows[0].user_id;
    const applicationIdQuery = await pool.query(
      `
      SELECT id FROM applications WHERE applicant_id = $1 ORDER BY date DESC LIMIT 1
      `,
      [applicant_id]
    );
    const application_id = applicationIdQuery.rows[0].id;
    const projectTitleQuery = await pool.query(
      `
      SELECT field_value 
      FROM application_content 
      WHERE application_id = $1
      AND field_name = 'ResearchProject';
      `,
      [application_id]
    );
    const projectTitle = projectTitleQuery.rows[0].field_value;
    var userRole = "supervisor";
    send_mail(subjects, recipientTypes, recipientNames, recipientEmails, status, userRole, projectTitle);

    console.log(recipientNames);
    console.log(recipientEmails);

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
  var recipientNames;
  var recipientEmails;
  var recipientTypes;

  try {
    const projectTitleQuery = await pool.query(
      `
      SELECT field_value 
      FROM application_content 
      WHERE application_id = $1
      AND field_name = 'ResearchProject';
      `,
      [id]
    );
    const projectTitle = projectTitleQuery.rows[0].field_value;
    const applicantId = await pool.query(
      `
      SELECT applicant_id FROM applications WHERE id = $1;
      `,
      [id]
    );
    const applicantInfo = await pool.query(
      `
        SELECT username, email FROM users WHERE user_id = $1;
        `,
      [applicantId.rows[0].applicant_id]
    )

    // Extracting names and emails from the query result for applicant
    const applicantName = applicantInfo.rows[0].username;
    const applicantEmail = applicantInfo.rows[0].email;
    const userType = ["applicant"];
    recipientNames = [applicantName];
    recipientEmails = [applicantEmail];
    recipientTypes = [...userType];
    console.log(recipientEmails)
    console.log(recipientNames)

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



    if (userRole === "reviewer" && currentStatus.includes("by") && (currentStatus.includes("reviewers") || currentStatus.includes("Reviewers"))) {
      console.log("joined here when I approved");
      const reviewers = await pool.query(
        "SELECT user_id FROM user_roles WHERE role = 'reviewer' AND application_id = $1",
        [id]
      );

      const remainingApprovalQuery = await pool.query(
        `
      SELECT remaining_approval
      FROM applications
      WHERE id = $1
      `,
        [id]
      );

      const adminInfo = await pool.query(
        `
        SELECT username, email FROM users WHERE role = 'admin';
        `
      );

      const userType = ["admin"];

      // Extracting names and emails from the query result
      const adminNames = adminInfo.rows.map(user => user.username);
      const adminEmails = adminInfo.rows.map(user => user.email);


      // Combine admin and applicant names and emails into single arrays
      recipientNames = [...recipientNames, ...adminNames];
      recipientEmails = [...recipientEmails, ...adminEmails];
      recipientTypes = [...recipientTypes, ...userType];

      const subjectAdmin = ["You have to give the final approval"];
      const subjectApplicant = ["Approved by reviewer, pending ethics' approval"];

      var subjects = [...subjectApplicant, ...subjectAdmin];

      console.log("subjects:", subjects);
      console.log(projectTitle);
      console.log(recipientNames);
      console.log(recipientEmails);

      const remainingApprovalArray = remainingApprovalQuery.rows[0].remaining_approval;

      // Check if the current user has already approved the application
      if (!remainingApprovalArray.includes(userId)) {
        return res.json({
          success: false,
          message: "You already approved this application",
        });
      } else {
        // Update the status based on the number of remaining approvals
        const numReviewers = reviewers.rows.length;
        const numApprovals = numReviewers - remainingApprovalArray.length + 1;
        console.log(numReviewers, numApprovals);
        if (numReviewers === numApprovals) {
          status = "Reviewer approval complete, pending ethics admin's approval";
        }
        else {
          status = `Approved by ${numApprovals} / ${numReviewers} reviewers`;
        }

        // Update the status in the applications table
        const updateStatusQuery = `
        UPDATE applications
        SET status = $1, date = $2
        WHERE id = $3
        RETURNING *;
      `;
        const currentDate = new Date();
        const updatedApplication = await pool.query(updateStatusQuery, [
          status,
          currentDate,
          id,
        ]);

        // remove userId from remaining_approval array in applications
        const removeReviewerFromRemainingApproval = await pool.query(
          `
        UPDATE applications
        SET remaining_approval = array_remove(remaining_approval, $1)
        WHERE id = $2
        `,
          [userId, id]
        )
              send_mail(subjects, recipientTypes, recipientNames, recipientEmails, status, userRole, projectTitle);

        return res.json({
          success: true,
          message: "Successful Approval",
        });
      }
    }

    // ...

    if (userRole === "none") {
      if (
        currentStatus ===
        "Reviewer approval complete, pending ethics admin's approval"
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
          "Reviewer approval complete, pending ethics admin's approval"
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
        if (
          currentStatus ===
          "Reviewer approval complete, pending ethics admin's approval"
        ) {
        


          // Combine admin and applicant names and emails into single arrays
          recipientNames = [...recipientNames];
          recipientEmails = [...recipientEmails];
          recipientTypes = [...recipientTypes];

          const subjectApplicant = ["Your application has been approved"];

          var subjects = [...subjectApplicant];

          const updateStatusQuery =
            "UPDATE applications SET status = $1, date = $2 WHERE id = $3 RETURNING *";
          const currentDate = new Date();
          const updatedApplication = await pool.query(updateStatusQuery, [
            status,
            currentDate,
            id,
          ]);

          send_mail(subjects, recipientTypes, recipientNames, recipientEmails, status, userRole, projectTitle);

          console.log("subjects:", subjects);
          console.log(projectTitle);
          console.log(recipientNames);
          console.log(recipientEmails);
          console.log("Hello user type", recipientTypes);
          
          return res.json({
            success: true,
            message: "Successful Approval",
          });
        } 
    }

    if (userRole === "supervisor") {
      if (currentStatus === "Pending supervisor's admission") {
        try {
          status = "Approved by supervisor, pending reviewers addition";

          const adminInfo = await pool.query(
            `
            SELECT username, email FROM users WHERE role = 'admin';
            `
          );

          const userType = ["admin"];

          // Extracting names and emails from the query result
          const adminNames = adminInfo.rows.map(user => user.username);
          const adminEmails = adminInfo.rows.map(user => user.email);


          // Combine admin and applicant names and emails into single arrays
          recipientNames = [...recipientNames, ...adminNames];
          recipientEmails = [...recipientEmails, ...adminEmails];
          recipientTypes = [...recipientTypes, ...userType];

          const subjectAdmin = ["You have to assign reviewers"];
          const subjectApplicant = ["Approved by supervisor, pending reviewers addition"];

          var subjects = [...subjectApplicant, ...subjectAdmin];



        } catch (error) {
          console.error("Error fetching admin users:", error);
          return res.status(500).json({
            success: false,
            message: "An error occurred while fetching admin users.",
          });
        }
      } else {
        return res.json({
          success: false,
          message:
            "Application is already approved by you, it's time for the reviewers to review.",
        });
      }
    }
    if (userRole === "reviewer") {
      if (currentStatus === "Reviewers assigned by Ethics Admin") {
        status = "Reviewer approval complete, pending ethics admin's approval";

        const userType = ["admin"];

        // Extracting names and emails from the query result
        const adminNames = adminInfo.rows.map(user => user.username);
        const adminEmails = adminInfo.rows.map(user => user.email);


        // Combine admin and applicant names and emails into single arrays
        recipientNames = [...recipientNames, ...adminNames];
        recipientEmails = [...recipientEmails, ...adminEmails];
        recipientTypes = [...recipientTypes, ...userType];

        const subjectAdmin = ["You have to do the final Approve"];
        const subjectApplicant = ["Approved by reviewers, pending Admin's Approval"];

        var subjects = [...subjectApplicant, ...subjectAdmin];
      }
      if (
        currentStatus ===
        "Reviewer approval complete, pending ethics admin's approval"
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



    console.log(" I am calling send_mail now");
    send_mail(subjects, recipientTypes, recipientNames, recipientEmails, status, userRole, projectTitle);

    console.log("subjects:", subjects);
    console.log(projectTitle);
    console.log(recipientNames);
    console.log(recipientEmails);
    console.log("Hello user type", recipientTypes);

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

    const oldStatusQuery = await pool.query(`
    SELECT application_status FROM comments WHERE application_id = $1;
    `,
      [applicationId]
    );
    const oldStatus = oldStatusQuery.rows[0].application_status;
    console.log(oldStatus);
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
      [oldStatus, new Date(), userId, applicationId]
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

    //delete existing comments for this application
    const deleteComments = await pool.query(
      `
    DELETE FROM comments
    WHERE application_id = $1;
    `,
      [applicationId]
    );


    res.json({ success: true, applicationId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
