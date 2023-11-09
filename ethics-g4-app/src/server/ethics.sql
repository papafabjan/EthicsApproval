CREATE DATABASE ethics;
USE ethics;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL
);


INSERT INTO users (username, firstName, lastName)
VALUES 
('user1', 'john', 'doe'),
('user2', 'mario', 'mclyfe'),
('user69', 'fab', 'og');