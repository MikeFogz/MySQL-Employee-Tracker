INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO department (name)
VALUES ("Dev Ops");


INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Coordinator", 65000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 155000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 125000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Product Manager", 195000, 1);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Smith", 1, 01);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steven", "Anderson", 12, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dave", "Johnson", 3, 02);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kate", "Moss", 4, NULL);




