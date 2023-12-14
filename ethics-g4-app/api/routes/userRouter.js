const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get user by Google-ID
router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await pool.query("SELECT * FROM users WHERE google_id = $1", [
      userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(501).json({ error: "User not found" });
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get user by user-ID
router.get("/users/userID/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(500).json({ error: "User not found" });
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update user role
router.put("/users/:userId/edit-role", async (req, res) => {
  const { userId } = req.params;
  const { newRole } = req.body;

  try {
    const updatedUser = await pool.query(
      "UPDATE users SET role = $1 WHERE user_id = $2 RETURNING *",
      [newRole, userId]
    );

    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
