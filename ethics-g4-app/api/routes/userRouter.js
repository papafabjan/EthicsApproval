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
    if (newRole === "admin") {
      const fetchAdmin = await pool.query(
        "SELECT role FROM user_roles WHERE user_id = $1 AND role = $2",
        [userId, newRole]
      );
      if (fetchAdmin.rows.length === 0) {
        console.log("Admin role added successfully");
        // Admin role does not exist, so add it
        const addAdmin = await pool.query(
          "INSERT INTO user_roles (user_id, role) VALUES ($1, $2)",
          [userId, newRole]
        );
      }else{
        console.log("Admin role already exists for this user");
      }
    }
    if (newRole !== "admin") {
      console.log("Admin role removed successfully.");
        // Check if the user has the admin role
      const checkAdminRole = await pool.query(
        "SELECT 1 FROM user_roles WHERE user_id = $1 AND role = $2 LIMIT 1",
        [userId, "admin"]
      );

      if (checkAdminRole.rows.length > 0) {
        // User has the admin role, proceed to remove it
        const deleteAdminRole = await pool.query(
          "DELETE FROM user_roles WHERE user_id = $1 AND role = $2",
          [userId, "admin"]
        );
      }
    }
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

  // Delete user by user-ID
router.delete("/users/:userId/delete", async (req, res) => {
  const { userId } = req.params;

  try {
    const deleteUserRoles = await pool.query(
      `
      DELETE FROM user_roles
      WHERE user_id = $1
      RETURNING *;
      `,
      [userId]
    );

    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [userId]
    );

    if (deleteUser.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
