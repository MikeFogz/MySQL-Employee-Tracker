const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require('console.table')

const connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "password",
database: "employee_db",
});

figlet('Employee Tracker!', async (err, transformed) => {
    if (err) throw err;
    console.log(transformed);
    
});

const start = () => {
    inquirer
    .prompt({
    name: 'trackerAction',
    type: 'list',
    message: 'What action would you like to take?',
    choices: [
        'Add an Employee',
        'View Employees',
        'View Employees by Manager',
        'Add a Department',
        'View Departments',
        'Add a Role', 
        'View Roles', 
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

        case 'View Employees by Manager':
            viewEmpByMgr();
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
            connection.end();
            process.exit(0);
    }
    });
};

start();

//---------- Adding & Viewing Employees -------

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
            name: 'roleId',
            type: 'input',
            message: `What is the employee's role ID?`,
        },
        {
            name: 'managerId',
            type: 'input',
            message: `What is their manager's ID, if they have one?`,
        },  
        ])
        .then((answer) => {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            },
            (err) => {
                if (err) throw err;
                console.log('Employee successfully added!');

                start();
            }
            );
        });
    };

const viewEmp = () => {
    let query =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name AS department, concat(manager.first_name, ' ', manager.last_name) AS manager "
    query +=
        "FROM employee INNER JOIN role ON employee.role_id = role.id "
    query +=
        "INNER JOIN department ON role.department_id = department.id "
    query +=
        "LEFT JOIN employee AS manager ON employee.manager_id = manager.id;"
    console.log("Selecting all employees...\n");
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
};

const viewEmpByMgr = () => {
    let query =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name AS department, concat(manager.first_name, ' ', manager.last_name) AS manager "
    query +=
        "FROM employee INNER JOIN role ON employee.role_id = role.id "
    query +=
        "INNER JOIN department ON role.department_id = department.id "
    query +=
        "INNER JOIN employee as Manager on employee.manager_id = manager.id;"
    console.log("Selecting all employees by Manager...\n");
    connection.query(query, (err, res) => {
        if (err) throw err;
        // Log all results
        console.table(res);
        // re-prompt the user back to the beginning
        start();
    });
};

//---------- Adding & Viewing Departments -------

const addDep = () => {
    inquirer
    .prompt([
        { 
            name: 'departmentName',
            type: 'input',
            message: 'What is the new department called?',
        },

        ])
        .then((answer) => {
            connection.query(
            'INSERT INTO department SET ?',
            {
                department_name: answer.departmentName,
            },
            (err) => {
                if (err) throw err;
                console.log('Department successfully added!');
                start();
            }
            );
        });
    };

    const viewDep = () => {
        console.log('List of all current departments. \n')
        connection.query('SELECT * FROM department', (err, res) =>{
            if (err) throw err;
            console.table(res);
            start();
        });
    };

//---------- Adding, Viewing, Updating Roles -------

    const addRole = () => {
        inquirer
        .prompt([
            { 
                name: 'title',
                type: 'input',
                message: 'What is the title for the new role?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for the new role?',
            },
            {
                name: 'departmentId',
                type: 'input',
                message: `What department is the role in?`,
            },
            ])
            .then((answer) => {
                connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentId,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Role successfully added!');
                    start();
                }
                );
            });
        };

    const viewRole = () => {
        console.log('List of all current roles. \n')
        connection.query('SELECT * FROM role', (err, res) =>{
            if (err) throw err;
            console.table(res);
            start();
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
