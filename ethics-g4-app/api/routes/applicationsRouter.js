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

// Add this endpoint to your server
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
      ["pending", new Date(), userID]
    );

    const applicationId = newApplication.rows[0].id;

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

// Update application body
// router.put("/applications/:applicationId/edit-body", async (req, res) => {
//   const { applicationId } = req.params;
//   const { newBody } = req.body;

//   try {
//     const updatedApplication = await pool.query(
//       "UPDATE applications SET body = $1 WHERE id = $2 RETURNING *",
//       [newBody, applicationId]
//     );

//     res.json(updatedApplication.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
