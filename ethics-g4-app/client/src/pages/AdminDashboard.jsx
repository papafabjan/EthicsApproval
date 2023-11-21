import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newRole, setNewRole] = useState('');

  // Fetch users from your API
  useEffect(() => {
    // Replace 'api/users' with your actual API endpoint
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
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
      <Link to="http://localhost:4000/api/users">
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
              <img src={user.img} alt={user.username} />
              <p>{user.username}</p>
              <p>Role: {user.role}</p>
              <button onClick={() => setNewRole("admin")}>
                Change to Admin
              </button>
              <button onClick={() => setNewRole("student")}>
                Change to Student
              </button>
              {/* Add more role options as needed */}
              <button onClick={() => updateUserRole(user.user_id, newRole)}>
                Update Role
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
