import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledAdminDashboard from "../styled/AdminDashboard.styled";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("users");
  const [department_name, setDepartmentName] = useState("");
  const [department_code, setDepartmentCode] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Fetch departments from API
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/departments`)
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));

    // Fetch users from API
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [fetchTrigger]);

  // Filter users based on search term and sort by role and username
  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a.role === b.role) {
        // If roles are the same, sort by username
        return a.username.localeCompare(b.username);
      }
      // Otherwise, sort by role
      return a.role === "admin" ? -1 : a.role === "staff" ? 1 : 0;
    });

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteUser = (userId) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${userId}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        // Refresh the users list or handle UI update
        setFetchTrigger((prev) => prev + 1);
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Function to update user role
  const updateUserRole = (userId, newRole, departmentCode) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${userId}/edit-role/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newRole, departmentCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === userId ? { ...user, role: data.role } : user
          )
        );
        setFetchTrigger((prev) => prev - 1);
      })
      .catch((error) => console.error("Error updating user role:", error));
  };

  const addDepartment = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/departments/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department_name: department_name,
            department_code: department_code,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add department");
      }
      setFetchTrigger((prev) => prev + 1);
      setDepartmentName("");
      setDepartmentCode("");
    } catch (error) {
      console.error("Error deleting department:", error.message);
    }
  };

  const deleteDepartment = async (departmentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/departments/${departmentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFetchTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting department:", error.message);
    }
  };

  const handleDepartmentButtonClick = (departmentCode) => {
    setSelectedUserId(null);
    updateUserRole(selectedUserId, "admin", departmentCode);
  };

  const renderDepartmentButtons = () => {
    return departments.map((department) => (
      <button
        key={department.id}
        className="btn"
        onClick={() => handleDepartmentButtonClick(department.code)}
      >
        {department.name}
      </button>
    ));
  };

  const updateAdminRole = (user_id) => {
    setSelectedUserId((prevUserId) =>
      prevUserId === user_id ? null : user_id
    );
  };

  return (
    <StyledAdminDashboard>
      <div className="header">
      <Link to={`${import.meta.env.VITE_SERVER_URL}/api/users`}>
        <h1>Admin Dashboard</h1>
      </Link>
      <div>
        <button className="btn" onClick={() => setCurrentView("users")}>
          Manage Users
        </button>
        <button className="btn" onClick={() => setCurrentView("departments")}>
          Manage Departments
        </button>
      </div>
      {currentView === "users" && (
        <>
          <div>
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
                    {user?.admin_of_department && (
                      <p>Department: {user.admin_of_department}</p>
                    )}
                    <button
                      className="btn"
                      onClick={() => updateAdminRole(user.user_id)}
                    >
                      Change to Admin
                    </button>
                    <button
                      className="btn"
                      disabled={selectedUserId === user.user_id}
                      onClick={() => updateUserRole(user.user_id, "staff", "")}
                    >
                      Change to Staff
                    </button>
                    <button
                      className="btn"
                      disabled={selectedUserId === user.user_id}
                      onClick={() =>
                        updateUserRole(user.user_id, "student", "")
                      }
                    >
                      Change to User
                    </button>
                    <button
                      className="btn"
                      disabled={selectedUserId === user.user_id}
                      onClick={() => deleteUser(user.user_id)}
                    >
                      Delete User
                    </button>
                  </div>
                  {selectedUserId !== null &&
                    selectedUserId === user.user_id &&
                    renderDepartmentButtons()}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {currentView === "departments" && (
        <>
          <h1> Departments</h1>
          <input
            type="text"
            placeholder="Department name"
            value={department_name}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Department code"
            value={department_code}
            onChange={(e) => setDepartmentCode(e.target.value)}
          />
          <button className="btn" onClick={() => addDepartment()}>
            Create a Department
          </button>
          <ul>
            {filteredDepartments.map((department) => (
              <li key={department.id}>
                <div>
                  <p>{department.name}</p>
                  <p>Code: {department.code}</p>
                  <button
                    className="btn"
                    onClick={() => deleteDepartment(department.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
   </StyledAdminDashboard>
  );
};

export default AdminDashboard;
