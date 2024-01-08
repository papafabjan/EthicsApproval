const express = require("express");
const router = express.Router();
const pool = require("../db");

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

      // Insert the data into the user_roles table
      await pool.query(
        "INSERT INTO user_roles (user_id, role, application_id) VALUES ($1, $2, $3)",
        [userId, role, applicationId]
      );
    }
    //Update the status of the application to Reviewers Assigned
    await pool.query(
      "UPDATE applications SET status = 'Reviewers Assigned' WHERE id = $1",
      [applicationId]
    );
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
