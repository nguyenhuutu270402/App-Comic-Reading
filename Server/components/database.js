var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // host: 'localhost',
    // user: 'root',
    // password: 'root123',
    // database: 'db_comicreading',

});

connection.connect(function (err, connection) {
    if (err) console.log(err)
    else console.log("Ket noi CSDL thanh cong")
});

module.exports = connection;