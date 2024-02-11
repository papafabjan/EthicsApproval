import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledDashboard from "../styled/Dashboard.styled";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === userId ? { ...user, role: data.role } : user
          )
        );
      })
      .catch((error) => console.error("Error updating user role:", error));
  };

  return (
    <StyledDashboard>
      <div className="header">
        <Link to={`${import.meta.env.VITE_SERVER_URL}/api/users`}>
          <h1>Admin Dashboard</h1>
        </Link>
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.user_id} className="row">
            <div>
              <img
                src={user.img}
                alt={user.username}
                referrerPolicy="no-referrer"
              />
              <p>{user.username}</p>
              <p>Role: {user.role}</p>
            </div>
            <div className="actions">
              <button
                className="btn"
                onClick={() => updateUserRole(user.user_id, "admin")}
              >
                Admin
              </button>
              <button
                className="btn"
                onClick={() => updateUserRole(user.user_id, "staff")}
              >
                Staff
              </button>
              <button
                className="btn"
                onClick={() => updateUserRole(user.user_id, "student")}
              >
                User
              </button>
            </div>
          </li>
        ))}
      </ul>
    </StyledDashboard>
  );
};

export default AdminDashboard;
