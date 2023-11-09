import React, {useState, useEffect} from 'react'

function AddUsers() {
  const [message, setMessage] = useState(null);


  const [formData, setFormData] = useState({ // To be added
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
    
    <div>
      
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

export default AddUsers