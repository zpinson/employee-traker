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
        "update employee's role",
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

        case "update employee's role":
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
      .query("SELECT * FROM role")
      .then((roles) => {
        console.table(roles);
      })
      .then(() => run());
  };
};

const add = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to add?",
      choices: ["employee", "manager", "role", "department"],
    })
    .then((answer) => {
      switch (answer.action) {
        case "employee":
          addEmployee();
          break;

        case "manager":
          addManager();
          break;

        case "role":
          addRole();
          break;

        case "department":
          addDepartment();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const addEmployee = () => {
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
        name: "role",
        type: "input",
        message: "role id number",
      },
    ])
    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.role,
        },
        (err) => {
          if (err) throw err;
          console.log("You successfully added a new employee!");
          run();
        }
      );
    });
};

const addManager = () => {
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
        name: "role",
        type: "input",
        message: "role id number",
      },
      {
        name: "manager",
        type: "input",
        message: "manager id number",
      },
    ])
    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.role,
          manager_id: answer.manager,
        },
        (err) => {
          if (err) throw err;
          console.log("You successfully added a new employee!");
          run();
        }
      );
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "department name",
      },
    ])
    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        (err) => {
          if (err) throw err;
          console.log("You successfully added a new department!");
          run();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "employee title",
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
      {
        name: "departmentId",
        type: "input",
        message: "department id",
      },
    ])
    .then((answer) => {
      console.log(answer);
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO role SET ?",
        // QUESTION: What does the || 0 do?
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId,
        },
        (err) => {
          if (err) throw err;
          console.log("You successfully added a new role!");
          run();
        }
      );
    });
};

const update = () => {
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "id of employee you would like to change role",
        },
        {
          name: "newRole",
          type: "input",
          message: "new role id",
        },
      ])
      .then((answer) => {
        console.log(answer);
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          `UPDATE employee SET role_id = ${answer.newRole} WHERE id = ${answer.id}`,
          // QUESTION: What does the || 0 do?

          (err) => {
            if (err) throw err;
            console.log("You successfully changed employee role!");
            //   re-prompt the user for if they want to bid or post
            run();
          }
        );
      });
  };

run();
