const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const prompts = require('./js/prompts')
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  port: process.env.PORT || 3306,
  user: process.env.USER,
  password: process.env.PASS,
  database: 'employeeDb',
});

connection.connect((err) => {
  if (err) throw err;
  startSearch();
});

const startSearch = () => {
  inquirer
    .prompt([
      {
        name: 'choices',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'Add Department',
          'Add Employee',
          'Add Role',
          'View Department(s)',
          'View Employee(s)',
          'View Role(s)',
          'Update Employee Role',
          'Exit'
        ]
      }
    ])
    .then((answer) => {
      switch (answer.choices) {
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'View Department(s)':
          viewDepartment();
          break;
        case 'View Employee(s)':
          viewEmployee();
          break;
        case 'View Role(s)':
          viewRole();
          break;
        case 'Update Employee Role':
          updateRole();
          break;
        case 'Exit':
          console.log('Thank you for using "Employee Tracker" by Kyle Tran! Bye (:')
          process.exit(0);

        default:
          console.log(`Invalid action: ${answer.choices}`);
          break;
      };
    })
};

const addDepartment = () => {
  inquirer
    .prompt(prompts.departmentPrompts)
    .then((answers) => {
      const query = 'INSERT INTO departments (name) VALUES (?)';
      connection.query(query, (answers.name), (err, res) => {
        if (res) {
          console.log(`Success! The department, ${answers.name}, has been added to the list!`)
        }
        else {
          console.log(err);
        }
        startSearch();
      });
    });
};

const addEmployee = () => {
  inquirer
    .prompt(prompts.employeePrompts)
    .then((answers) => {
      const query = 'INSERT INTO employees (firstName, lastName, role_id, manager_id) VALUES (?, ?, ?, ?)';
      connection.query(query, [answers.firstName, answers.lastName, answers.role_id, answers.manager_id], (err, res) => {
        if (res) {
          console.log(`Success! The employee, ${answers.firstName} ${answers.lastName}, has been added to the list!`)
        }
        else {
          console.log(err);
        }
        startSearch();
      });
    });
};

const addRole = () => {
  inquirer
    .prompt(prompts.rolePrompts)
    .then((answers) => {
      const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ? ,?)';
      connection.query(query, [answers.title, answers.salary, answers.department_id], (err, res) => {
        if (res) {
          console.log(`Success! The role, ${answers.title}, has been added to the list!`)
        }
        else {
          console.log(err);
        }
        startSearch();
      });
    });
};
