const express = require("express");
const ViteExpress = require("vite-express");
const db = require('./database'); // Import the database functions
const app = express();

app.use("/users/", require("./routes/usersRoute"));


// Create a route to add a user
app.post('/addUser', (req, res) => {
  const userData = req.body;
  console.log(userData.username, userData.firstName, userData .lastName);
  db.addUser(userData, (err, result) => {
    if (err) {
      // Handle the error
      res.status(500).json({ error: 'Failed to add user main.js' });
    } else {
      // User added successfully
      res.json({ message: 'User added successfully' });
    }
  });
});

// Create a route to display all users
app.get('/getAllUsers', (req, res) => {
  db.getAllUsers((err, results) => {
    if (err) {
      // Handle the error
      res.status(500).json({ error: 'Failed to retrieve users' });
    } else {
      // Display the retrieved users
      res.json({ users: results });
    }
  });
});


app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
