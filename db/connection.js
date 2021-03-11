const mysql= require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    // port: 3000,
    user: 'root',
    password: 'password',
    database: 'employeedb'
});

connection.connect(function (err){
    if(err) throw err;
});
connection.query = util.promisify(connection.query);

module.exports = connection;