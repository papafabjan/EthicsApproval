CREATE DATABASE ethics;
USE ethics;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  google_id VARCHAR(255) NOT NULL UNIQUE
  
);

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  body VARCHAR(255) NOT NULL,
  applicant_id INT references users(user_id) NOT NULL  
);


INSERT INTO users (username, firstName, lastName)
VALUES 
('user1', 'john', 'doe'),
('user2', 'mario', 'mclyfe'),
('user69', 'fab', 'og');
('user10', 'panos', 'op')
