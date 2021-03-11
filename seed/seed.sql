USE employeeDB;

INSERT INTO department (name) VALUES ('Accounting'), ('IT'), ('HR'), ('Sales')


INSERT INTO role (title, salary, department_id) VALUES ('accountent', '60000', 1), 
('Web Developer', 85000, 2), ('Recrutor', 55000, 3), ('Representative', 45000, 4),



INSERT INTO employee (first_name, last_name, role_id) 
VALUES ('Sasha', "Smith", 1), ('Sarah', "Dupond", 2), ('Sam', "Saroch", 3), ('Savana', "Turk", 4)