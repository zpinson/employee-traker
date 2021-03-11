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
    connection
      .query("SELECT * FROM employee")
      .then((employees) => {
        console.table(employees);
      })
      .then(() => run());
  };

  const viewDepartment = () => {
    connection
      .query("SELECT * FROM department")
      .then((departments) => {
        console.table(departments);
      })
      .then(() => run());
  };

  const viewRole = () => {
    connection
      .query("SELECT * FROM employee JOIN role JOIN department")
      .then((roles) => {
        console.table(roles);
      })
      .then(() => run());
  };
};

const add = () => {
  inquirer
    .prompt([
      {
        name: "first",
        type: "input",
        message: "first name",
      },
      {
        name: "last",
        type: "input",
        message: "last name",
      },
      {
        name: "manager",
        type: "list",
        choices: ["1", "2", "3"],
      },
      {
        name: "department",
        type: "list",
        choices: ["1", "2", "3"],
      },
      {
        name: "title",
        type: "input",
        message: "employee role",
      },
      {
        name: "salary",
        type: "input",
        message: "Salary?",
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee SET ?",
        // QUESTION: What does the || 0 do?
        {
          first_name: answer.first,
          last_name: answer.last,
          mangager_id: answer.manager || "",
        },
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
        },
        (err) => {
          if (err) throw err;
          console.log("You successfully added a new employee!");
          // re-prompt the user for if they want to bid or post
          run();
        }
      );
    });
};

run();
