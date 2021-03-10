const inquirer = require("inquirer");
const mysql = require("mysql");

const run = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees / Department / Role",
        "Add  employees / Department / Role",
        "update employee / role",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all employees / Department / Role":
          view();
          break;

        case "Add  employees / Department / Role":
          add();
          break;

        case "update employee / role":
          update();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const view = () => {
  inquirer
    .prompt({
      name: "viewChoice",
      type: "rawlist",
      message: "What would you like to view?",
      choices: ["employees", "Department", "role"],
    })
    .then((answer) => {
      switch (answer.viewChoice) {
        case "employees":
          viewEmployees();
          break;

        case "Department":
          viewDepartment();
          break;

        case "role":
          viewRole();
          break;

        default:
          console.log(`Invalid action: ${answer.viewChoice}`);
          break;
      }
    });

  const viewEmployees = () => {
    const answer =
      "SELECT first_name, last_name, rol_id, employee_id FROM employeeDB";
    connection.answer(answer, { Employee: answer.Employee }, (err, res) => {
      res.forEach(({ first_name, last_name, role_id, employee_id }) => {
        console.log(
          `Name: ${
            first_name + "" + last_name
          } || Role: ${role_id} || Employee ID: ${employee_id}`
        );
      });
    });
  };

  const viewDepartment = () => {
    const answer = "SELECT department_id FROM employeeDB WHERE ?";
    connection.answer(answer, { Department: answer.department }, (err, res) => {
      res.forEach(({ department_id }) => {
        console.log(`Department: ${department_id} `);
      });
    });
  };
  const viewRole = () => {
    const answer = "SELECT role_id FROM employeeDB WHERE ?";
    connection.answer(answer, { Role: answer.role }, (err, res) => {
      res.forEach(({ role_id }) => {
        console.log(`Role: ${role_id} `);
      });
    });
  };
};

const add = () => {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees / Department / Role",
          "Add  employees / Department / Role",
          "update employee / role",
        ],
      })
      .then((answer) => {
        switch (answer.action.choices) {
          case "View all employees / Department / Role":
            view();
            break;
  
          case "Add  employees / Department / Role":
            add();
            break;
  
          case "update employee / role":
            update();
            break;
  
          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
      });
  };


run();
