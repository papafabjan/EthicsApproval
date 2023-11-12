import React, { useState, useEffect } from "react";

function AddUsers() {
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    // To be added
    username: "",
    firstName: "",
    lastName: "",
  });

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

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Add a New User</h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="mb-3">
            <label className="form-label">
              Username:
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              First Name:
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Last Name:
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button type="submit" className="btn">
            Add User
          </button>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </>
  );
}

export default AddUsers;
