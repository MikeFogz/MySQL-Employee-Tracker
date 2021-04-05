DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (6,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);
