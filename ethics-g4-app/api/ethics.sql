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



-- INSERT INTO users (username, img, google_id)
-- VALUES 
-- ('Fabian Papa', 'example.link.com', '182963416123'),
-- ('Panagiotis Karalis', 'example.link.com', '786348326542'),
-- ('Markos Darlas Mandravelis', 'example.link.com', '72346279346992'),
-- ('Marios Polyzoidis', 'example.link.com', '97236469729476');

INSERT INTO users (username, img, google_id, email, role)
VALUES
  ('Kostas Dimopoulos', 'img_url_1', '123', 'k.dimopoulos@york.citycollege.eu', 'role_1'),
  ('Dimitris Dranidis', 'img_url_2', '1234', 'dranidis@york.citycollege.eu', 'role_2'),
  ('Odysseas Efremidis', 'img_url_3', '12345', 'oefremidis@athtech.gr', 'role_3'),
  ('Dimitris Irakleous', 'img_url_4', '123456', 'diracleous@athtech.gr', 'role_4');


INSERT INTO applications ( body, status, date, applicant_id)
VALUES 
('Test','Pending supervisor admission','23/11/2023','1'),
('Test 2','Pending supervisor admission','23/11/2023','2');




--should the supervisor have to accept/refuse the application without even going into it or just make a comment in the supervisor field, saying i dont want to be the supervisor for this application.
--should we have controllers in our app? so far everything works with routers.