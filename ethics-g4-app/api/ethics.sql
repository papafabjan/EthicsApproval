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
  firstname VARCHAR(255) ,
  middlename VARCHAR(255),
  lastname VARCHAR(255) ,
  email VARCHAR(255) ,
  studentregistration VARCHAR(255) ,
  programme VARCHAR(255) ,
  supervisor VARCHAR(255) ,
  researchproject VARCHAR(255) ,
  coapplicantname VARCHAR(255) ,
  coapplicantemail VARCHAR(255) ,
  startdate VARCHAR(255) ,
  enddate VARCHAR(255) ,
  funding VARCHAR(255) ,
  fundingother VARCHAR(255),
  country VARCHAR(255) ARRAY,
  othercountry VARCHAR(255),
  projectplace VARCHAR(255) ,
  healthsocialcare VARCHAR(255) ,
  anotherinstitution VARCHAR(255) ,
  anotherinstitutionother VARCHAR(255),
  humantissue VARCHAR(255) ,
  clinicalmedical VARCHAR(255) ,
  socialcareservices VARCHAR(255) ,
  aimsobjectives TEXT ,
  methodology TEXT ,
  safetyconcerns TEXT ,
  sensitivetopics TEXT ,
  potentialparticipants TEXT ,
  recruitingpotentialparticipants TEXT ,
  payment VARCHAR(255) ,
  otherpaymentoption VARCHAR(255),
  potentialharm TEXT ,
  vulnerableparticipants TEXT ,
  othervulnerableparticipantsoptions TEXT,
  dataprocessing TEXT ,
  dataconfidentiality TEXT ,
  datastorageandsecurity TEXT 
);



CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  content references application_content(application_id) NOT NULL,
  status VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  applicant_id INT references users(user_id) NOT NULL
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  field VARCHAR(255) NOT NULL,
  application_id references applications(id) NOT NULL,
);

CREATE TABLE application_content (
  id SERIAL PRIMARY KEY,
  application_id INTEGER REFERENCES applications(id) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  student_registration VARCHAR(255) NOT NULL,
  programme VARCHAR(255) NOT NULL,
  supervisor VARCHAR(255) NOT NULL,
  research_project VARCHAR(255) NOT NULL,
  co_applicant_name VARCHAR(255) NOT NULL,
  co_applicant_email VARCHAR(255) NOT NULL,
  start_date VARCHAR(255) NOT NULL,
  end_date VARCHAR(255) NOT NULL,
  funding VARCHAR(255) NOT NULL,
  funding_other VARCHAR(255),
  country VARCHAR(255) ARRAY,
  other_country VARCHAR(255),
  project_place VARCHAR(255) NOT NULL,
  health_social_care VARCHAR(255) NOT NULL,
  another_institution VARCHAR(255) NOT NULL,
  another_institution_other VARCHAR(255),
  human_tissue VARCHAR(255) NOT NULL,
  clinical_medical VARCHAR(255) NOT NULL,
  social_care_services VARCHAR(255) NOT NULL,
  aims_objectives TEXT NOT NULL,
  methodology TEXT NOT NULL,
  safety_concerns TEXT NOT NULL,
  sensitive_topics TEXT NOT NULL,
  potential_participants TEXT NOT NULL,
  recruiting_potential_participants TEXT NOT NULL,
  payment VARCHAR(255) NOT NULL,
  other_payment_option VARCHAR(255),
  potential_harm TEXT NOT NULL,
  vulnerable_participants TEXT NOT NULL,
  other_vulnerable_participants_options TEXT,
  data_processing TEXT NOT NULL,
  data_confidentiality TEXT NOT NULL,
  data_storage_and_security TEXT NOT NULL,
  list_of_questions TEXT NOT NULL,
  additional_forms TEXT NOT NULL
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
