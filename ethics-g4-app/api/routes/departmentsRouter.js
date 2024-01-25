const express = require("express");
const router = express.Router();
const pool = require("../db");

//Delete a department based on department.id

// Get all departments
router.get("/departments", async (req, res) => {
  try {
    const departmentsFetch = await pool.query("SELECT * FROM departments");

    const departments = departmentsFetch.rows;
    console.log(departments);

    res.status(200).json(departments);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/departments/add", async (req, res) => {
  try {
    const department_name = req.body.department_name;
    const department_code = req.body.department_code;

    const departmentCreate = await pool.query(
      "INSERT INTO departments (name, code) VALUES ($1, $2)",
      [department_name, department_code]
    );

    console.log(department_name, department_code);

    res.status(200).json({ message: "Department created successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/departments/:department_id", async (req, res) => {
  try {
    const { department_id } = req.params;
    //check if department exists
    const departmentExists = await pool.query(
      "SELECT * FROM departments WHERE id = $1",
      [department_id]
    );
    if (departmentExists.rows.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    } else {
      const departmentDelete = await pool.query(
        "DELETE FROM departments WHERE id = $1",
        [department_id]
      );
      console.log("Deleted department named", departmentExists.rows[0].name);
      res.status(200).json({ message: "Department deleted successfully" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
