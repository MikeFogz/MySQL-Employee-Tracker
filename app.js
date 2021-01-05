const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db",
});

// const start


const addEmployee = () => {
    inquirer
    .prompt([
        { 
            name: 'firstName',
            type: 'input',
            message: 'What is the first name of the new employee?',
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the last name of the new employee?',
        },
        {
            name: 'role',
            type: 'input',
            message: `What is the employee's role?`,
        },
        {
            name: 'manager',
            type: 'input',
            message: `Who is their manager, if they have one?`,
        },  
        ])

// const viewEmployee

// const updateRole
