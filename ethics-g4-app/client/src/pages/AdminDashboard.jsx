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
    // Display confirmation dialog before deleting user
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
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
    }
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
      if (!department_name || !department_code) {
        throw new Error("Department name and code are required");
      }
  
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
      console.error("Error adding department:", error.message);
    }
  };
  

  const deleteDepartment = async (departmentId) => {
    // Display confirmation dialog before deleting department
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
    if (confirmDelete) {
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
    }
  };

  const handleDepartmentButtonClick = (departmentCode) => {
    setSelectedUserId(null);
    updateUserRole(selectedUserId, "admin", departmentCode);
  };

 const renderDepartmentButtons = () => {
   const adminDepartments = users.reduce((departments, user) => {
     if (user.role === "admin" && user.admin_of_department) {
       departments.add(user.admin_of_department);
     }
     return departments;
   }, new Set());

   return departments.map((department) => (
     <button
       key={department.id}
       className="btn"
       disabled={adminDepartments.has(department.code)}
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
      <div>
        <Link to={`${import.meta.env.VITE_SERVER_URL}/api/users`}>
          <h1>Admin Dashboard</h1>
        </Link>
        <div className="tabs">
          <button
            title="Switch tabs"
            className="btn"
            onClick={() => setCurrentView("users")}
          >
            Manage Users
          </button>
          <button
            title="Switch tabs"
            className="btn"
            onClick={() => setCurrentView("departments")}
          >
            Manage Departments
          </button>
        </div>
        {currentView === "users" && (
          <>
            <input
              type="text"
              placeholder="Search by username"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              <div className="header">
                <p className="username">Username</p>
                <p className="role">Role</p>
                <p className="department">Department</p>
                <p className="actions">Actions</p>
                <p className="actions"></p>
              </div>
            </div>
            <table>
              <tbody>
                {filteredUsers.map((user) => (
                  <>
                    <tr key={user.user_id}>
                      <td className="username">
                        <img
                          title={"User ID: " +user.user_id}
                          src={user.img}
                          alt={user.username}
                          referrerPolicy="no-referrer"
                        />
                        {user.username}
                      </td>
                      <td className="role">{user.role}</td>
                      <td className="department">{user.admin_of_department}</td>
                      <td className="actions">
                        <button
                          className="btn"
                          onClick={() => updateAdminRole(user.user_id)}
                        >
                          Make Admin
                        </button>
                        <button
                          className="btn"
                          disabled={selectedUserId === user.user_id}
                          onClick={() =>
                            updateUserRole(user.user_id, "staff", "")
                          }
                        >
                          Make Staff
                        </button>
                        <button
                          className="btn"
                          disabled={selectedUserId === user.user_id}
                          onClick={() =>
                            updateUserRole(user.user_id, "student", "")
                          }
                        >
                          Make Student
                        </button>
                        <button
                          className="btn btn_delete"
                          disabled={selectedUserId === user.user_id}
                          onClick={() => deleteUser(user.user_id)}
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                    {selectedUserId === user.user_id && (
                      <tr key={selectedUserId}>
                        {selectedUserId !== null &&
                          selectedUserId === user.user_id &&
                          renderDepartmentButtons()}
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </>
        )}
        {currentView === "departments" && (
          <>
            <div className="create-departments">
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
              <button className="btn btn_appro" onClick={() => addDepartment()}>
                Create Department
              </button>
            </div>
            <table className="departments-table">
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th>Department Code</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.map((department) => (
                  <tr key={department.id}>
                    <td>{department.name}</td>
                    <td>{department.code}</td>
                    <td>
                      <button
                        className="btn btn_delete"
                        onClick={() => deleteDepartment(department.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </StyledAdminDashboard>
  );
};

export default AdminDashboard;
