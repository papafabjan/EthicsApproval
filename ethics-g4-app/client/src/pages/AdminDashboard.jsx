import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to update user role
  const updateUserRole = (userId, newRole) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${userId}/edit-role/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newRole }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the local state with the updated user data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === userId ? { ...user, role: data.role } : user
          )
        );
      })
      .catch((error) => console.error("Error updating user role:", error));
  };

  return (
    <div>
      <Link to={`${import.meta.env.VITE_SERVER_URL}/api/users`}>
        <h1>Admin Dashboard</h1>
      </Link>
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.user_id}>
            <div>
              <img
                src={user.img}
                alt={user.username}
                referrerPolicy="no-referrer"
              />
              <p>{user.username}</p>
              <p>Role: {user.role}</p>
              <button
                className="btn"
                onClick={() => updateUserRole(user.user_id, "admin")}
              >
                Change to Admin
              </button>
              <button
                className="btn"
                onClick={() => updateUserRole(user.user_id, "staff")}
              >
                Change to Staff
              </button>
              <button
                className="btn"
                onClick={() => updateUserRole(user.user_id, "student")}
              >
                Change to User
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
