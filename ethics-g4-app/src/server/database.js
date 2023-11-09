const mysql = require('mysql2');

// Create a MySQL database connection
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpassword',
  database: 'ethics',
});

// Connect to the MySQL database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define your database object
const db = {
  connection: dbConnection,
  
  // Example function to query the database
  query: (sql, values, callback) => {
    dbConnection.query(sql, values, callback);
  },

};
// Function to insert a user into the database
const addUser = (userData, callback) => {
  const sql = 'INSERT INTO users (username, firstName, lastName) VALUES (?, ?, ?)';
  const values = [userData.username, userData.firstName, userData.lastName];
  console.log(sql);
  console.log(values);
  dbConnection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      callback(err, null);
    } else {
      console.log('User inserted successfully');
      callback(null, result);
    }
  });
};

// Function to retrieve all users from the database
const getAllUsers = (callback) => {
  const sql = 'SELECT * FROM users';

  dbConnection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving users:', err);
      callback(err, null);
    } else {
      console.log('Users retrieved successfully');
      callback(null, results);
    }
  });
};


// Export the functions for use in other parts of the application
module.exports = {
  addUser,
  getAllUsers,
  db
};

