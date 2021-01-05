const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db",
});

// const start = () => {


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
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
            'INSERT INTO employee SET ?',
              // QUESTION: What does the || 0 do?
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.role,
                manager_id: answer.manager
            },
            (err) => {
                if (err) throw err;
                console.log('Employee successfully added!');
                // re-prompt the user for if they want to add, view, or update.
                start();
            }
            );
        });
    };

// const viewEmployee

// const updateRole
