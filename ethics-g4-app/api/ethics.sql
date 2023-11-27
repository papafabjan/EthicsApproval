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


CREATE TABLE applications_test (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    studentregistration VARCHAR(255) NOT NULL,
    programme VARCHAR(255) NOT NULL,
    supervisor VARCHAR(255) NOT NULL
);


CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  content references application_content(application_id) NOT NULL,
  status VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  applicant_id INT references users(user_id) NOT NULL
);

CREATE TABLE application_content (
  id SERIAL PRIMARY KEY,
  application_id references applications(id) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  middlename VARCHAR(255),
  lastname VARCHAR(255) NOT NULL,
  regnum VARCHAR(255) NOT NULL,
  programme VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  co_applicant_names VARCHAR(255) NOT NULL,
  co_applicant_emails VARCHAR(255) NOT NULL,
  startdate DATE NOT NULL,
  enddate DATE NOT NULL,
  externalfund VARCHAR(255),
  country VARCHAR(255) NOT NULL,
  typeofstudy VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  humantissue VARCHAR(255) NOT NULL,
  clinical_trial_or_medical_device VARCHAR(255) NOT NULL,
  social_care_services VARCHAR(255) NOT NULL,
  aims VARCHAR(255) NOT NULL,
  methodology VARCHAR(255) NOT NULL,
  safety_concern VARCHAR(255) NOT NULL,  
  sensitive_topics VARCHAR(255),
  sensitive_material BYTEA,
  potential_participants VARCHAR(255) NOT NULL,
  recruitment VARCHAR(255) NOT NULL,
  payment VARCHAR NOT NULL,
  harm VARCHAR(255) NOT NULL,
  vulnerableparticipant VARCHAR NOT NULL,
  participant_info_form BYTEA,
  participant_consent_form BYTEA,
  debriefing_form BYTEA,
  accessibility_letter BYTEA,
  parental_consent_form BYTEA,
  parental_info_form BYTEA,
  child_adolescent_info_consent_form BYTEA,
  head_teacher_consent_form BYTEA,
  head_teacher_info_form BYTEA,
  data_processing VARCHAR NOT NULL,
  data_confidentiality VARCHAR(255) NOT NULL,
  data_storage_and_security VARCHAR(255) NOT NULL,
  list_of_questions BYTEA,
  additional_forms BYTEA
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