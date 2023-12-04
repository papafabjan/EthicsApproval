const express = require("express");
const router = express.Router();
const pool = require("../db");
const cors = require("cors");

router.options("/api/testapplications/add", cors());

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

// Add a new test application

router.post("/testapplications/add", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    studentRegistration,
    programme,
    supervisor,
  } = req.body.values;
  console.log(req.body);

  try {
    const newTestApplication = await pool.query(
      "INSERT INTO applications_test (firstname, lastname, email, studentregistration, programme, supervisor) VALUES ($1, $2, $3, $4, $5, $6)",
      [firstName, lastName, email, studentRegistration, programme, supervisor]
    );

    res.json(newTestApplication.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
