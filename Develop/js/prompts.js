const departmentPrompts = {
  name: 'name',
  type: 'input',
  message: 'What is the name of the department you would like to add?'
};

const employeePrompts = [
  {
    name: 'firstName',
    type: 'input',
    message: "What is the employee's first name?"
  },
  {
    name: 'lastName',
    type: 'input',
    message: "What is the employee's last name?"
  },
  {
    name: 'role_id',
    type: 'input',
    message: "What is the employee's role id? (Must be a number)",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  },
  {
    name: 'manager_id',
    type: 'input',
    message: "What is the id of the employee's manager? (May be null if no manager)",
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  },
];

const rolePrompts = [
  {
    name: 'title',
    type: 'input',
    message: 'What is the title of the role you would like to add?'
  },
  {
    name: 'salary',
    type: 'input',
    message: 'What is the salary of the role you would like to add? (Must be a number)',
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  },
  {
    name: 'department_id',
    type: 'input',
    message: 'What is the department id of the role you would like to add? (Must be a number)',
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  },
];

module.exports = {departmentPrompts, employeePrompts, rolePrompts};
