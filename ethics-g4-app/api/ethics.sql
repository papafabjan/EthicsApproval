/*
psql -U postgres;
CREATE DATABASE ethics;
CREATE USER root WITH PASSWORD 'rootpassword';
GRANT ALL PRIVILEGES ON DATABASE ethics to root;
ALTER AUTHORIZATION ON DATABASE::[ethics] TO [root];
USE ethics;
\q
psql -U root -d ethics
*/

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  img VARCHAR(255) NOT NULL,
  google_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL,
  access_token VARCHAR(255) NOT NULL,
  refresh_token VARCHAR(255) NOT NULL,
  admin_of_department VARCHAR(255),
  CONSTRAINT admin_department_unique UNIQUE (admin_of_department)
-- If you don't have the constraint in your pre-existing table run the command below:
-- CREATE UNIQUE INDEX unique_admin_department ON users (admin_of_department) WHERE admin_of_department IS NOT NULL;
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

INSERT INTO departments (name, code) VALUES 
  ('Business & Economics', 'BAED'),
  ('Computer Science', 'COM'),
  ('Psychology Studies', 'PSY'),
  ('Humanities Department', 'HUM');



CREATE TABLE application_content (
  id SERIAL PRIMARY KEY,
  application_id INTEGER REFERENCES applications(id) NOT NULL,
  field_name VARCHAR(255) NOT NULL,
  field_value TEXT
);

CREATE TABLE application_history (
  id SERIAL PRIMARY KEY,
  application_id INTEGER REFERENCES applications(id) NOT NULL,
  date TIMESTAMP NOT NULL,
  status VARCHAR(255) NOT NULL,
  actor_id INTEGER REFERENCES users(user_id)
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
  application_id INTEGER  REFERENCES applications (id)
);




-- generate dbml file with:
-- sql2dbml ethics.sql --postgres -o ethics.dbml