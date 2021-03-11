USE employeeDB;

INSERT INTO department (name) VALUES ('Accounting'), ('IT'), ('HR'), ('Sales')


INSERT INTO role (title, salary, department_id) VALUES ('accountent', '60000', 1)



INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Sasha', "Smith", 1, 1)