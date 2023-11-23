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
