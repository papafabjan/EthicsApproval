CREATE DATABASE ethics;
USE ethics;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  google_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL
);


CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  body VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  applicant_id INT references users(user_id) NOT NULL
);

-- INSERT INTO users (username, img, google_id)
-- VALUES 
-- ('Fabian Papa', 'example.link.com', '182963416123'),
-- ('Panagiotis Karalis', 'example.link.com', '786348326542'),
-- ('Markos Darlas Mandravelis', 'example.link.com', '72346279346992'),
-- ('Marios Polyzoidis', 'example.link.com', '97236469729476');


INSERT INTO applications ( body, status, date, applicant_id)
VALUES 
('Test','Pending supervisor admission','23/11/2023','1'),
('Test 2','Pending supervisor admission','23/11/2023','2');