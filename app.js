const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "password",
database: "employee_db",
});

const start = () => {
    inquirer
    .prompt({
    name: 'trackerAction',
    type: 'list',
    message: 'What action would you like to take?',
    choices: [
        'Add an Employee',
        'View an Employee',
        'Add a Department',
        'View a Department',
        'Add a Role', 
        'View a Role', 
        'Update a Role', 
        'EXIT'],
    })
    .then((answer) => {
    switch (answer.trackerAction ) {
        case 'Add an Employee':
            addEmp();
            break;

        case 'View Employees':
            viewEmp();
            break;

        case 'Add a Department':
            addDep();
            break;

        case 'View Departments':
            viewDep();
            break;

        case 'Add a Role':
            addRole();
            break;

        case 'View Roles':
            viewRole();
            break;

        case 'Update a Role':
            updateRole(); 
            break;

        default:
            console.log(`Invalid action: ${answer.trackerAction}`);
            break;
    }
    });
};

start();

const addEmp = () => {
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

const viewEmp = () => {
    connection.query
}

const addDep = () => {
    inquirer
    .prompt([
        { 
            name: 'name',
            type: 'input',
            message: 'What is the new department called?',
        },
        ])
        .then((answer) => {
            connection.query(
            'INSERT INTO department SET ?',
            {
                name: answer.name,
            },
            (err) => {
                if (err) throw err;
                console.log('Department successfully added!');
                start();
            }
            );
        });
    };


const updateRole = () => {
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'employee',
                    type: 'rawlist',
                    choices() {
                        const employeeArray = [];
                        results.forEach(({ last_name }) => {
                            employeeArray.push(last_name);
                        });
                        return employeeArray;
                    },
                    message: "Which employee's role would you like to update?",
                },
                {
                    name: 'role',
                    type: 'input',
                    message: 'What should their new role be?',
                },
            ])
            .then((answer) => {
                connection.query(
                    'UPDATE employee WHERE ?',
                    [
                        {
                            role_id: answer.role,
                        },
                    ],
                    (error) => {
                        if (error) throw err;
                        console.log('Role successfully updated.');
                        start();
                    }
                );
                });
            });
};
