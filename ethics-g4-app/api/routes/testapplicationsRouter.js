const express = require("express");
const router = express.Router();
const pool = require("../db");
const cors = require("cors");

// router.options("/api/applications/add", cors());

// Get all test applications
router.get("/testapplications", async (req, res) => {
  try {
    const testApplications = await pool.query(
      "SELECT * FROM applications_test"
    );
    res.json(testApplications.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
