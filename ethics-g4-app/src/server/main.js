const cors = require('cors');
const express = require("express");
const ViteExpress = require("vite-express");
const db = require('./database'); // Import the database functions
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users/", require("./routes/usersRoute"));


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

// Create a route to add a user
app.post('/addUser', (req, res) => {

  db.addUser(req.body, (err, result) => {
    if (err) {
      // Handle the error
      res.status(500).json({ error: 'Failed to add user main.js' });
    } else {
      // User added successfully
      res.json({ message: 'User added successfully' });
    }
  });
});

app.post('/removeUser', (req, res) => {
  const username = req.body.username; // Get the username from the request body

  db.removeUser(username, (err, result) => {
    if (err) {
      // Handle the error
      res.status(500).json({ error: 'Failed to remove user' });
    } else {
      // User removed successfully
      res.json({ message: 'User removed successfully' });
    }
  });
});


app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
