import React, { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  const [message, setMessage] = useState(null);

 const handleChange = (e) => {
  console.log(e.target.name, e.target.value);
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));

    try {
      const response = await fetch("/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("User added successfully");
        setFormData({ username: "", firstName: "", lastName: "" });
      } else {
        setMessage("Failed to add user users.jsx");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  useEffect(() => {
    // Fetch users from the backend using the getAllUsers function
    fetch("http://localhost:3000/getAllUsers")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setUsers(jsonRes.users));
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <>
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Username:</strong> {user.username}
            <br />
            <strong>First Name:</strong> {user.firstName}
            <br />
            <strong>Last Name:</strong> {user.lastName}
          </li>
        ))}
      </ul>
    </div>
    <div>
         <h1>Add a New User</h1>
      <form onSubmit={handleSubmit} method="post">
        <label>
          Username:
          <input
            type="text"
            name="username" 
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="firstName" 
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName" 
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </>
  );
}

export default Users;