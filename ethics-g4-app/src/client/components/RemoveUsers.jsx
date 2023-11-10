import React, {useState, useEffect} from 'react'

export default function RemoveUsers() {

    const [username, setUsername] = useState(""); // To be removed
    const [message, setMessage] = useState(null);


    const removeUser = async (e) => {
    e.preventDefault();
  try {
    const response = await fetch("/removeUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (response.ok) {
      setMessage("User removed successfully");
      // You can update the user list or perform other actions as needed
    } else {
      setMessage("Failed to remove user");
      setUsername("");
    }
  } catch (error) {
    setMessage("Error: " + error.message);
  }
};

  return (
    <>
    <h1>RemoveUsers</h1>
    <div className="container mt-5">
      <form onSubmit={removeUser}>
        <div className="mb-3">
      <label className="form-label">Enter the username to remove:
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      </div>
      <button type="submit" className="btn">Remove User</button>
    </form>
    {message && <p>{message}</p>}
    </div>
    </>
  )
}
