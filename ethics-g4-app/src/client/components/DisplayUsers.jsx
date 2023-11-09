import React, {useState, useEffect} from 'react'

function DisplayUsers() {
    const [users, setUsers] = useState([]); // To be displayed

    useEffect(() => {
    // Fetch users from the backend using the getAllUsers function
    fetch("/getAllUsers")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setUsers(jsonRes.users));
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount


  return (
    <>
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
    
    </>
    
  )
}

export default DisplayUsers