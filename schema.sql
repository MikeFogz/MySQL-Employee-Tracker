DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  song VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id NULL,
  PRIMARY KEY (id)
);