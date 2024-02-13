-- CREATE DATABASE ethics;
-- USE ethics;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  google_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL,
  admin_of_department VARCHAR(255)
);


CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL,
  applicant_id INT REFERENCES users(user_id) NOT NULL,
  department_code VARCHAR(255) NOT NULL,
  remaining_approval INT[]
);

CREATE TABLE departments(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(255) NOT NULL
);


CREATE TABLE application_content (
  id SERIAL PRIMARY KEY,
  application_id INTEGER REFERENCES applications(id) NOT NULL,
  field_name VARCHAR(255) NOT NULL,
  field_value TEXT
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  commenter_id INTEGER REFERENCES users(user_id),
  field VARCHAR(255) NOT NULL,
  content VARCHAR(255) NOT NULL,
  application_status VARCHAR(255) NOT NULL,
  application_id INTEGER REFERENCES applications(id) NOT NULL
);

CREATE TABLE user_roles (
  user_id INTEGER REFERENCES users (user_id),
  role VARCHAR(255) NOT NULL,
  application_id INTEGER  REFERENCES applications (id),
  approved BOOLEAN DEFAULT false
);