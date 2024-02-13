const express = require("express");
const router = express.Router();
const pool = require("../db");
const send_mail = require("../gmailApi");


// POST route to assign reviewers
router.post("/reviewer/assign-reviewer", async (req, res) => {
  try {
    const { applicationId, reviewers, role } = req.body;

    for (const reviewer of reviewers) {
      // Search for the user with the specified email in the users table
      const userQuery = await pool.query(
        "SELECT user_id FROM users WHERE email = $1",
        [reviewer]
      );

      // Check if the query returned any results
      if (userQuery.rows.length === 0) {
        return res
          .status(400)
          .json({ error: `User with email ${reviewer} not found` });
      }

      const userId = userQuery.rows[0].user_id;

      // Check if the user is already a reviewer for the application
      const checkReviewerQuery = await pool.query(
        `
        SELECT * FROM user_roles
        WHERE user_id = $1 AND role = 'reviewer' AND application_id = $2
        `,
        [userId, applicationId]
      );

      if (checkReviewerQuery.rows.length > 0) {
        return res.status(400).json({ error: "Reviewer already exists" });
      }

      // Insert the data into the user_roles table
      await pool.query(
        `
        INSERT INTO user_roles (user_id, role, application_id)
        VALUES ($1, $2, $3)
        `,
        [userId, role, applicationId]
      );

      // Add the userId to the remaining_approval array in the applications table
      await pool.query(
        `
        UPDATE applications
        SET remaining_approval = array_append(remaining_approval, $1)
        WHERE id = $2;
        `,
        [userId, applicationId]
      );
    }


    //Update the status of the application to Reviewers assigned by Ethics Admin
    await pool.query(
      "UPDATE applications SET status = 'Reviewers assigned by Ethics Admin' WHERE id = $1",
      [applicationId]
    );








    const userIDQuery = await pool.query(
      `
      SELECT applicant_id FROM applications WHERE id = $1;
      `,
      [applicationId]
    );
    const userID = userIDQuery.rows[0].applicant_id;
    const applicantInfo = await pool.query(
      `
        SELECT username, email, user_id FROM users WHERE user_id = $1;
        `,
      [userID]
    );
    const applicantName = applicantInfo.rows[0].username;
    const applicantEmail = applicantInfo.rows[0].email;
    var reviewersName;

    var recipientNames = [applicantName];
    var recipientEmails = [applicantEmail];
    var recipientTypes = ["applicant"];
    var subjects = ["Reviewers have been assigned by Ethics Admin"];
    for (const reviewer of reviewers) {
      const reviewerInfo = await pool.query(
        `
        SELECT username FROM users WHERE email = $1;
        `,
        [reviewer]
      );
      const reviewersNames = reviewerInfo.rows.map(user => user.username);
      recipientNames = [...recipientNames, reviewersNames];
      subjects = [...subjects, "You have been assigned as a reviewer"];
      recipientEmails = [...recipientEmails, reviewer];
      console.log("blepoume auto to console log emails", recipientEmails);
      recipientTypes = [...recipientTypes, "reviewers"];
    }


    // Extracting names and emails from the query result for applicant





    const status = "Reviewers assigned by Ethics Admin";


    const projectTitleQuery = await pool.query(
      `
      SELECT field_value 
      FROM application_content 
      WHERE application_id = $1
      AND field_name = 'ResearchProject';
      `,
      [applicationId]
    );
    const projectTitle = projectTitleQuery.rows[0].field_value;
    var userRole = "reviewers";
    send_mail(subjects, recipientTypes, recipientNames, recipientEmails, status, userRole, projectTitle);

    console.log(recipientNames);
    console.log(recipientEmails);







    res.status(200).json({ message: "Reviewers assigned successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Endpoint to get existing reviewers for an application
router.get("/reviewer/existing-reviewers", async (req, res) => {
  const { applicationId } = req.query;

  try {
    console.log(
      "Received request for existing reviewers. Application ID:",
      applicationId
    );

    // Fetch existing reviewers from your database based on applicationId
    const existingReviewersQuery = await pool.query(
      "SELECT user_id FROM user_roles WHERE application_id = $1 AND role = $2",
      [applicationId, "reviewer"]
    );

    const existingReviewers = existingReviewersQuery.rows.map(
      (row) => row.user_id
    );

    // Fetch usernames from the users table based on user_ids
    const usernamesQuery = await pool.query(
      "SELECT user_id, username FROM users WHERE user_id = ANY($1)",
      [existingReviewers]
    );

    const reviewersWithUsernames = usernamesQuery.rows.map((row) => ({
      user_id: row.user_id,
      username: row.username,
    }));
    console.log("Existing Reviewers:", reviewersWithUsernames);
    res.json({ reviewers: reviewersWithUsernames });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all applications where the userID is a reviewer
router.get("/reviewer/applications/:googleUserId", async (req, res) => {
  const { googleUserId } = req.params;
  try {
    // Fetch user_id from users table based on the userId received from the req.params
    const userIdResult = await pool.query(
      "SELECT user_id FROM users WHERE google_id = $1",
      [googleUserId]
    );

    // Access the user ID from the rows property
    const userId = userIdResult.rows[0]?.user_id;

    // Fetch applicationIDs from user_roles table based on the user_id and role = 'reviewer'
    const applicationIDs = await pool.query(
      "SELECT application_id FROM user_roles WHERE user_id = $1 AND role = 'reviewer'",
      [userId]
    );

    if (applicationIDs.rows.length === 0) {
      res.json([]);
    } else {
      // Extract an array of application_id values
      const applicationIdsArray = applicationIDs.rows.map(
        (row) => row.application_id
      );

      // Use the extracted array in the next query
      const applications = await pool.query(
        "SELECT * FROM applications WHERE id = ANY($1)",
        [applicationIdsArray]
      );

      res.json(applications.rows);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
