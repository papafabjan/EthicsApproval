import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("users");
  const [department_name, setDepartmentName] = useState("");
  const [department_code, setDepartmentCode] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    if (currentView === "departments") {
      // Fetch departments from API
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/departments`)
        .then((response) => response.json())
        .then((data) => setDepartments(data))
        .catch((error) => console.error("Error fetching departments:", error));
    } else if (currentView === "users") {
      // Fetch users from API
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`)
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error("Error fetching users:", error));
    }
    // Add currentView as a dependency to useEffect
  }, [currentView, fetchTrigger]);

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        setFetchTrigger((prev) => prev - 1);
      })
      .catch((error) => console.error("Error updating user role:", error));
  };


   const addDepartment = async () => {
    console.log("Adding ");
     try {
       const response = await fetch(
         `${import.meta.env.VITE_SERVER_URL}/api/departments/add`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ department_name: department_name, department_code: department_code }),
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

  // Function Delete Department
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

  return (
    <div>
      <Link to={`${import.meta.env.VITE_SERVER_URL}/api/users`}>
        <h1>Admin Dashboard</h1>
      </Link>
      <div>
        <button className="btn" onClick={() => setCurrentView("users")}>Manage Users</button>
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
                    <button
                    className="btn"
                    onClick={() => deleteUser(user.user_id)}
                  > Delete User</button>
                  </div>
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
          <button
            className="btn"
            onClick={() => addDepartment()}
          >
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
  );
};

export default AdminDashboard;
