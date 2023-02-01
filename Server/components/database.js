var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    // database: 'db_comicreading'
    database: 'db_test',

});

connection.connect(function (err, connection) {
    if (err) console.log(err)
    else console.log("Ket noi CSDL thanh cong")
});

module.exports = connection;