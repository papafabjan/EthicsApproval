const express = require("express");
const router = express.Router();
const pool = require("../db");
const send_mail = require("../gmailApi");
const fs = require("fs");

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

    // Extract the department code from the values array
    const departmentCode = values.Department;

    // Insert application
    const newApplication = await pool.query(
      `
      INSERT INTO applications (status, date, applicant_id, department_code) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
      `,
      ["Pending supervisor's admission", new Date(), userID, departmentCode]
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
        // Use fieldValue directly for non-file fields
        const fieldValueToStore = Array.isArray(fieldValue)
          ? fieldValue.join(",") // For arrays (e.g., multiple files)
          : fieldValue;

        await pool.query(
          `
      INSERT INTO application_content (application_id, field_name, field_value) 
      VALUES ($1, $2, $3);
      `,
          [applicationId, fieldName, fieldValueToStore]
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
    var subjects = [
      "Your application has been submitted",
      "You have been assigned as a supervisor",
    ];
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
    send_mail(
      subjects,
      recipientTypes,
      recipientNames,
      recipientEmails,
      status,
      userRole,
      projectTitle
    );

    console.log(recipientNames);
    console.log(recipientEmails);

    const updateHistory = await pool.query(
      `
    INSERT INTO application_history (application_id, date, status, actor_id)
    VALUES ($1, $2, $3, $4);
    `,
      [applicationId, new Date(), "Application was created", userID]
    );

    res.json({ success: true, applicationId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/applications/approve/:id", async (req, res) => {
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
    );

    // Extracting names and emails from the query result for applicant
    const applicantName = applicantInfo.rows[0].username;
    const applicantEmail = applicantInfo.rows[0].email;
    const userType = ["applicant"];
    recipientNames = [applicantName];
    recipientEmails = [applicantEmail];
    recipientTypes = [...userType];
    console.log(recipientEmails);
    console.log(recipientNames);

    //fetch status of application with id
    const fetchStatusQuery = `
    SELECT status FROM applications WHERE id = $1
    `;
    const fetchStatus = await pool.query(fetchStatusQuery, [id]);
    const currentStatus = fetchStatus.rows[0].status; //100%
    console.log(currentStatus);

    // Fetch the department of the application
    const departmentQuery = await pool.query(
      `
  SELECT field_value 
  FROM application_content 
  WHERE application_id = $1
  AND field_name = 'Department';
  `,
      [id]
    );
    const department = departmentQuery.rows[0].field_value;

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
    var isBoth = false;
    if (fetchRole.rows.length > 0) {
      const roleFromDb = fetchRole.rows[0].role;
      if (fetchRole.rows.length > 1) {
        //if more than 1 roles for the same user on the same application he can only be a reviewer attempting to approve.
        userRole = "reviewer";
        isBoth = true;
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

    //// REVIEWERS IF
    if (
      userRole === "reviewer" &&
      currentStatus.includes("by") &&
      (currentStatus.includes("reviewers") ||
        currentStatus.includes("Reviewers"))
    ) {
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

      const remainingApprovalArray =
        remainingApprovalQuery.rows[0].remaining_approval;

      // Check if the current user has already approved the application
      if (!remainingApprovalArray.includes(userId)) {
        return res.json({
          success: false,
          message: "You already approved this application",
        });
      } else {
        // Update the status based on the number of remaining approvals
        const numReviewers = reviewers.rows.length;

        if (isBoth && numReviewers === 1) {
          if (isAdmin) {
            console.log("entered isadmin");
            status = "Approved";
          } else {
            console.log("entered else");
            status =
              "Reviewer approval complete, pending ethics admin's approval";

            const adminInfo = await pool.query(
              `
        SELECT username, email FROM users WHERE role = 'admin' AND admin_of_department = $1;
        `,
              [department]
            );

            const userType = ["admin"];

            // Extracting names and emails from the query result
            const adminNames = adminInfo.rows.map((user) => user.username);
            const adminEmails = adminInfo.rows.map((user) => user.email);

            // Combine admin and applicant names and emails into single arrays
            recipientNames = [...recipientNames, ...adminNames];
            recipientEmails = [...recipientEmails, ...adminEmails];
            recipientTypes = [...recipientTypes, ...userType];

            const subjectAdmin = ["You have to give the final approval"];
            const subjectApplicant = [
              "Approved by reviewer(s), pending ethics' approval",
            ];

            var subjects = [...subjectApplicant, ...subjectAdmin];

            console.log("subjects:", subjects);
            console.log(projectTitle);
            console.log(recipientNames);
            console.log(recipientEmails);
          }
        } else {
          const numApprovals = numReviewers - remainingApprovalArray.length + 1;
          if (numReviewers === numApprovals) {
            status =
              "Reviewer approval complete, pending ethics admin's approval";
            const adminInfo = await pool.query(
              `
        SELECT username, email FROM users WHERE role = 'admin' AND admin_of_department = $1;
        `,
              [department]
            );

            const userType = ["admin"];

            // Extracting names and emails from the query result
            const adminNames = adminInfo.rows.map((user) => user.username);
            const adminEmails = adminInfo.rows.map((user) => user.email);

            // Combine admin and applicant names and emails into single arrays
            recipientNames = [...recipientNames, ...adminNames];
            recipientEmails = [...recipientEmails, ...adminEmails];
            recipientTypes = [...recipientTypes, ...userType];

            const subjectAdmin = ["You have to give the final approval"];
            const subjectApplicant = [
              "Approved by reviewer(s), pending ethics' approval",
            ];

            var subjects = [...subjectApplicant, ...subjectAdmin];

            console.log("subjects:", subjects);
            console.log(projectTitle);
            console.log(recipientNames);
            console.log(recipientEmails);
          } else {
            status = `Approved by ${numApprovals} / ${numReviewers} reviewers`;
            // remove userId from remaining_approval array in applications
            const removeReviewerFromRemainingApproval = await pool.query(
              `
                UPDATE applications
                SET remaining_approval = array_remove(remaining_approval, $1)
                WHERE id = $2
              `,
              [userId, id]
            );
            const remainingReviewersQuery = await pool.query(
              `
              SELECT remaining_approval FROM applications WHERE id = $1
              `,
              [id]
            );
            const remainingApprovalArray =
              remainingReviewersQuery.rows[0].remaining_approval;
            const remainingReviewersInfo = await pool.query(
              `
            SELECT username, email FROM users WHERE user_id = ANY($1)
            `,
              [remainingApprovalArray]
            );
            // Extracting names, emails, and user types from the query result
            const remainingReviewers = remainingReviewersInfo.rows;
            const reviewerNames = remainingReviewers.map(
              (user) => user.username
            );
            const reviewerEmails = remainingReviewers.map((user) => user.email);
            const userType = Array(reviewerNames.length).fill("reviewer");
            const subjectReviewer = Array(reviewerNames.length).fill(
              `The application ${projectTitle} has been approved by ${numApprovals} / ${numReviewers} reviewers`
            );
            const subjectApplicant = [
              `Your application ${projectTitle} has been approved by ${numApprovals} / ${numReviewers} reviewers`,
            ];

            // Combine reviewer names, emails, and user types into single arrays
            recipientNames = [...recipientNames, ...reviewerNames];
            recipientEmails = [...recipientEmails, ...reviewerEmails];
            recipientTypes = [...recipientTypes, ...userType];
            var subjects = [...subjectApplicant, ...subjectReviewer];
          }
        }
        // Update the status in the applications table
        const updateStatusQuery = `
          UPDATE applications
          SET status = $1
          WHERE id = $2
          RETURNING *;
        `;
        const updatedApplication = await pool.query(updateStatusQuery, [
          status,
          id,
        ]);

        const updateHistory = await pool.query(
          `
        INSERT INTO application_history
        (application_id, date, status, actor_id)
        VALUES
        ($1, $2, $3, $4);
        `,
          [id, new Date(), status, userId]
        );

        send_mail(
          subjects,
          recipientTypes,
          recipientNames,
          recipientEmails,
          status,
          userRole,
          projectTitle
        );

        return res.json({
          success: true,
          message: "Successful Approval",
        });
      }
    }
    if (userRole === "none") {
      if (
        currentStatus ===
        "Reviewer approval complete, pending ethics admin's approval"
      ) {
        console.log("entered none");
        // Use parameterized queries to avoid SQL injection
        const updateStatusQuery =
          "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *";

        try {
          const updatedApplication = await pool.query(updateStatusQuery, [
            status,
            id,
          ]);
          return res.json({
            success: true,
            message: "Successful Approval",
          });
        } catch (error) {
          console.error(error.message);
          return res.status(500).json({
            success: false,
            message: "Server Error",
          });
        }
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
          // THIS IS THE FINAL APROVAL
          console.log("ENTERED SUPERVISOR FINAL IF");

          const subjectApplicant = ["Your application has been approved"];

          const supervisorIdQuery = await pool.query(
            `SELECT user_id FROM user_roles WHERE application_id=$1 AND role='supervisor' 
            `,
            [id]
          );
          const supervisorId = supervisorIdQuery.rows[0].user_id;
          const supervisorInfo = await pool.query(
            `SELECT username, email FROM users WHERE user_id=$1
            `,
            [supervisorId]
          );

          const supervisorName = supervisorInfo.rows.map(
            (user) => user.username
          );
          const supervisorEmail = supervisorInfo.rows.map((user) => user.email);

          const adminInfo = await pool.query(
            `
            SELECT username, email FROM users WHERE role = 'admin' AND admin_of_department = $1;
            `,
            [department]
          );

          const userTypeAdmin = ["admin"];
          const userTypeSupervisor = ["supervisor"];

          // Extracting names and emails from the query result
          const adminName = adminInfo.rows.map((user) => user.username);
          const adminEmail = adminInfo.rows.map((user) => user.email);

          const subjectAdmin = [
            `The application with the name: ${projectTitle} has been approved by everyone`,
          ];
          const subjectSupervisor = [
            `The application with the name: ${projectTitle} has been approved by everyone`,
          ];

          var subjects = [...subjectApplicant];
          recipientEmails = [
            ...recipientEmails,
            ...supervisorEmail,
            ...adminEmail,
          ];
          recipientNames = [...recipientNames, ...supervisorName, ...adminName];
          recipientTypes = [
            ...recipientTypes,
            ...userTypeAdmin,
            ...userTypeSupervisor,
          ];
          subjects = [...subjects, ...subjectSupervisor, ...subjectAdmin];

          const updateStatusQuery =
            "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *";
          const updatedApplication = await pool.query(updateStatusQuery, [
            status,
            id,
          ]);
          console.log("Why are the subjects here?");
          console.log(subjects);

          send_mail(
            subjects,
            recipientTypes,
            recipientNames,
            recipientEmails,
            status,
            userRole,
            projectTitle
          );

          const updateHistory = await pool.query(
            `
            INSERT INTO application_history (application_id, date, status, actor_id)
            VALUES ($1, $2, $3, $4);
          `,
            [id, new Date(), status, userId]
          );

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
        // THIS IS THE FINAL APROVAL
        console.log("ENTERED REVIEWER FINAL IF");

        const subjectApplicant = ["Your application has been approved"];

        const supervisorIdQuery = await pool.query(
          `
           SELECT user_id FROM user_roles WHERE application_id=$1 AND role='supervisor' 
            `,
          [id]
        );
        const supervisorId = supervisorIdQuery.rows[0].user_id;
        const supervisorInfo = await pool.query(
          `
           SELECT username, email FROM users WHERE user_id=$1
            `,
          [supervisorId]
        );

        const supervisorName = supervisorInfo.rows.map((user) => user.username);
        const supervisorEmail = supervisorInfo.rows.map((user) => user.email);

        const adminInfo = await pool.query(
          `
            SELECT username, email FROM users WHERE role = 'admin' AND admin_of_department = $1;
            `,
          [department]
        );

        const userTypeAdmin = ["admin"];
        const userTypeSupervisor = ["supervisor"];

        // Extracting names and emails from the query result
        const adminName = adminInfo.rows.map((user) => user.username);
        const adminEmail = adminInfo.rows.map((user) => user.email);

        const subjectAdmin = [
          `The application with the name: ${projectTitle} has been approved by everyone`,
        ];
        const subjectSupervisor = [
          `The application with the name: ${projectTitle} has been approved by everyone`,
        ];

        var subjects = [...subjectApplicant];
        recipientEmails = [
          ...recipientEmails,
          ...supervisorEmail,
          ...adminEmail,
        ];
        recipientNames = [...recipientNames, ...supervisorName, ...adminName];
        recipientTypes = [
          ...recipientTypes,
          ...userTypeAdmin,
          ...userTypeSupervisor,
        ];
        subjects = [...subjects, ...subjectSupervisor, ...subjectAdmin];

        const updateStatusQuery =
          "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *";
        const updatedApplication = await pool.query(updateStatusQuery, [
          status,
          id,
        ]);

        send_mail(
          subjects,
          recipientTypes,
          recipientNames,
          recipientEmails,
          status,
          userRole,
          projectTitle
        );
        const updateHistory = await pool.query(
          `
            INSERT INTO application_history (application_id, date, status, actor_id)
            VALUES ($1, $2, $3, $4);
          `,
          [id, new Date(), status, userId]
        );
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
            SELECT username, email FROM users WHERE role = 'admin' AND admin_of_department = $1;
            `,
            [department]
          );

          const userType = ["admin"];

          // Extracting names and emails from the query result
          const adminNames = adminInfo.rows.map((user) => user.username);
          const adminEmails = adminInfo.rows.map((user) => user.email);

          // Combine admin and applicant names and emails into single arrays
          recipientNames = [...recipientNames, ...adminNames];
          recipientEmails = [...recipientEmails, ...adminEmails];
          recipientTypes = [...recipientTypes, ...userType];

          const subjectAdmin = ["You have to assign reviewers"];
          const subjectApplicant = [
            "Approved by supervisor, pending reviewers addition",
          ];

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
      SET status = $1
      WHERE id = $2
      RETURNING *;
      `;
    const updatedApplication = await pool.query(updateStatusQuery, [
      status,
      id,
    ]);

    console.log(" I am calling send_mail now");
    send_mail(
      subjects,
      recipientTypes,
      recipientNames,
      recipientEmails,
      status,
      userRole,
      projectTitle
    );

    const updateHistory = await pool.query(
      `
        INSERT INTO application_history (application_id, date, status, actor_id)
        VALUES ($1, $2, $3, $4);
      `,
      [id, new Date(), status, userId]
    );

    res.json({ success: true, message: "Successful Approval" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/applications/:applicationId/history", async (req, res) => {
  try {
    const { applicationId } = req.params;
    console.log(applicationId);
    const history = await pool.query(
      `
        SELECT * FROM application_history
        WHERE application_id = $1
        `,
      [applicationId]
    );
    if (history.rows.length === 0) {
      console.log("Application history not found");
    }

    if (history.rows.length > 0) {
      res.json({ success: true, history: history.rows });
    } else {
      res.json({ success: false, message: "Application history not found" });
    }
  } catch (error) {
    console.error(error.message);
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
      WHERE application_id = $1;
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
      WHERE application_id = $1;
      `,
      [applicationId]
    );

    // Delete application history
    const deleteApplicationHistory = await pool.query(
      `
      DELETE FROM application_history
      WHERE application_id = $1;
      `,
      [applicationId]
    );

    // Delete folder associated with application ID
    const folderPath = `./submitFiles/application_id_${applicationId}`;
    if (fs.existsSync(folderPath)) {
      fs.rmdirSync(folderPath, { recursive: true });
    }

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
    let oldStatus = ""; // Initialize oldStatus
    const oldStatusQuery = await pool.query(
      `
  SELECT application_status FROM comments WHERE application_id = $1;
  `,
      [applicationId]
    );
    const currentStatusQuery = await pool.query(
      `
      SELECT status FROM applications WHERE id = $1;
      `,
      [applicationId]
    );
    console.log("got current status", currentStatusQuery.rows[0].status);
    if (oldStatusQuery.rows.length > 0) {
      oldStatus = oldStatusQuery.rows[0].application_status;
    } else {
      oldStatus = currentStatusQuery.rows[0].status;
    }
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
      let fieldValueToStore;
      if (
        fieldValue === "" ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      ) {
        // If the value is empty or an empty array, delete the field from the table
        await pool.query(
          `
      DELETE FROM application_content
      WHERE application_id = $1 AND field_name = $2;
      `,
          [applicationId, fieldName]
        );
      } else {
        // Join array values with commas
        fieldValueToStore = Array.isArray(fieldValue)
          ? fieldValue.join(",")
          : fieldValue;
        // Check if the field already exists in the table
        const existingField = await pool.query(
          `
      SELECT * FROM application_content
      WHERE application_id = $1 AND field_name = $2;
      `,
          [applicationId, fieldName]
        );

        if (existingField.rows.length === 0) {
          // If the field does not exist, insert the new field into the table
          await pool.query(
            `
        INSERT INTO application_content (application_id, field_name, field_value) 
        VALUES ($1, $2, $3);
        `,
            [applicationId, fieldName, fieldValueToStore]
          );
        } else {
          // If the field exists, update the existing field in the table
          await pool.query(
            `
        UPDATE application_content
        SET field_value = $3
        WHERE application_id = $1 AND field_name = $2;
        `,
            [applicationId, fieldName, fieldValueToStore]
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
