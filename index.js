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
      .query("SELECT * FROM role")
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
        name: "role",
        type: "input",
        message: "role id number",
      },
      {
        name: "manager",
        type: "input",
        message: "manager id number or NULL",
      },
      {
        name: "department",
        type: "input",
        choices: "department name",
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
        console.log(answer)
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        ("INSERT INTO employee SET ?"),
        // QUESTION: What does the || 0 do?
        {
          first_name: answer.first,
          last_name: answer.last,
          role_id: answer.role,
          manager_id: answer.manager,
        },
        (err) => {
          if (err) throw err;
          //   console.log("You successfully added a new employee!");
          // re-prompt the user for if they want to bid or post
          //   run();
        }
      );
    });
    // .then((answer) => {
    //   // when finished prompting, insert a new item into the db with that info
    //   connection.query(
    //     "INSERT INTO role SET ?",
    //     // QUESTION: What does the || 0 do?
    //     {
    //       title: answer.title,
    //       salary: answer.salary,
    //     },
    //     (err) => {
    //       if (err) throw err;
    //       //   console.log("You successfully added a new employee!");
    //       // re-prompt the user for if they want to bid or post
    //       //   run();
    //     }
    //   );
    // })
    // .then((answer) => {
    //   // when finished prompting, insert a new item into the db with that info
    //   connection.query(
    //     "INSERT INTO department SET ?",
    //     // QUESTION: What does the || 0 do?
    //     {
    //       name: answer.department,
    //     },
    //     (err) => {
    //       if (err) throw err;
    //       console.log("You successfully added a new employee!");
    //       // re-prompt the user for if they want to bid or post
    //       run();
    //     }
    //   );
    // });
};

// const update = () => {
//   inquirer
//     .prompt({
//       name: "update",
//       type: "list",
//       message: "What would you like to update?",
//       choices: ["Salary", "Department", "role", "manager"],
//     })
//     .then((answer) => {
//       switch (answer.update) {
//         case "salary":
//           updateSalary();
//           break;

//         case "Department":
//           updateDepartment();
//           break;

//         case "role":
//           updateRole();
//           break;

//         case "manager":
//           updateManager();
//           break;

//         default:
//           console.log(`Invalid action: ${answer.update}`);
//           break;
//       }
//     });

//   const updateSalary = () => {
//     connection
//       .query("SELECT  FROM employee")
//       .then((employees) => {
//         console.table(employees);
//       })
//       .then(() => run());
//   };

//   const updateDepartment = () => {
//     connection
//       .query("SELECT * FROM department")
//       .then((departments) => {
//         console.table(departments);
//       })
//       .then(() => run());
//   };

//   const updateRole = () => {
//     connection
//       .query("SELECT * FROM employee JOIN role JOIN department")
//       .then((roles) => {
//         console.table(roles);
//       })
//       .then(() => run());
//   };
//   const updateManager = () => {
//     connection
//       .query("SELECT * FROM employee JOIN role JOIN department")
//       .then((roles) => {
//         console.table(roles);
//       })
//       .then(() => run());
//   };
// };

run();
