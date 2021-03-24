const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
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
          'Update Employee Role'
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

        default:
          console.log(`Invalid action: ${answer.choices}`);
          break;
      };
    })
};