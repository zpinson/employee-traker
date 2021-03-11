const inquirer = require("inquirer");
const connection = require("./db/connection");
const table = require("console.table");

const run = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
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
    connection.query("SELECT * FROM employee").then((employees) => {
      console.table(employees);
    }).then(() => run());
  };
  
  
  const viewDepartment = () => {
    connection.query("SELECT * FROM department").then((departments) => {
      console.table(departments);
    }).then(() => run());
  };

  const viewRole = () => {
    connection.query("SELECT * FROM role").then((roles) => {
      console.table(roles);
    }).then(() => run());
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
