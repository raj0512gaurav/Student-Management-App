const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    database:'student',
    user:'root',
    password:'Raj@1299'
})

module.exports = connection