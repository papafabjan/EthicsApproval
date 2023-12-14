const express = require("express");
const router = express.Router();
const pool = require("../db");

//get all applications where the userID is a supervisor
router.get("/supervisor/applications/:googleUserId", async (req, res) => {
  const { googleUserId } = req.params;
console.log(googleUserId);
  try {
    //fetch user_id from users table based on the userId received from the req.params
    const userIdResult = await pool.query(
      "SELECT user_id FROM users WHERE google_id = $1",
      [googleUserId]
    );

    // Access the user ID from the rows property
    const userId = userIdResult.rows[0]?.user_id;
console.log(userId);
    //fetch applicationIDs from user_roles table based on the user_id
    const applicationIDs = await pool.query(
      "SELECT application_id FROM user_roles WHERE user_id = $1 AND role = 'supervisor'", 
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
