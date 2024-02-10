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
router.get("/users/admin-department/:googleId", async (req, res) => {
  const { googleId } = req.params;

  try {
    const department = await pool.query("SELECT admin_of_department FROM users WHERE google_id = $1", [
      googleId,
    ]);

    if (department.rows.length === 0) {
      return res.status(500).json({ error: "User not found" });
    }

    res.json(department.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update user role
router.put("/users/:userId/edit-role", async (req, res) => {
  const { userId } = req.params;
  const { newRole, departmentCode } = req.body;

  try {
    // Fetch the current user's information
    const fetchUser = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );
    const user = fetchUser.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the new role is admin
    if (newRole === "admin") {
      // Add the admin role if not already present
      const fetchAdminRole = await pool.query(
        "SELECT role FROM user_roles WHERE user_id = $1 AND role = $2",
        [userId, newRole]
      );

      if (fetchAdminRole.rows.length === 0) {
        // Admin role does not exist, so add it
        await pool.query(
          "INSERT INTO user_roles (user_id, role) VALUES ($1, $2)",
          [userId, newRole]
        );
      }

      // Add or update the admin department code
      if (user.admin_of_department !== departmentCode) {
        await pool.query(
          "UPDATE users SET admin_of_department = $1 WHERE user_id = $2",
          [departmentCode, userId]
        );
      }
    } else {
      // New role is not admin

      // Check if the user has the admin role and admin department
      const fetchAdminInfo = await pool.query(
        "SELECT 1 FROM user_roles WHERE user_id = $1 AND role = $2 LIMIT 1",
        [userId, "admin"]
      );

      if (fetchAdminInfo.rows.length > 0) {
        // User has the admin role

        // Check if the user has an admin department assigned
        if (user.admin_of_department) {
          // Remove the admin department
          await pool.query(
            "UPDATE users SET admin_of_department = NULL WHERE user_id = $1",
            [userId]
          );
        }

        // Remove the admin role
        await pool.query(
          "DELETE FROM user_roles WHERE user_id = $1 AND role = $2",
          [userId, "admin"]
        );
      }
    }

    // Update the user's role
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
