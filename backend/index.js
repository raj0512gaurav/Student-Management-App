const express = require('express')
const mysql = require('mysql2')
const app = express();
const connection = require('./db_conn')
const cors = require('cors')


const bodyParser = require('body-parser')

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send('Hello world');
})

app.get('/students',(req,res) => {
    let alltstudents = "SELECT * FROM STUDENTDATA"
    connection.query(alltstudents,(err,result) => {
        if(err){
            throw err;
        }
        res.send(result);
    })
})

app.post('/upload',(req,res) => {
    const data = req.body;
    console.log(data);
    const sql = `INSERT INTO StudentData (RegistrationNumber, StudentName, DOB, EmailId, Department, CurrentCGPA)
     VALUES ("${data.RegistrationNumber}", "${data.StudentName}","${data.DOB}","${data.EmailId}","${data.Department}",${data.CurrentCGPA})`
     connection.query(sql,(err,result) => {
        if(err){
            throw err;
        }
        res.send(result);
     })
})

app.post('/delete/:id',(req,res) => {
    const regid = req.params.id;
    const sql = `DELETE FROM StudentData where RegistrationNumber = "${regid}"`
    connection.query(sql,(err,result) => {
        if(err){
            throw err;
        }
        res.send(result);
    })
})

app.post('/update/:id',(req,res) => {
    const cgpa = req.body.CurrentCGPA;
    const regid = req.params.id;
    const sql = `UPDATE StudentData SET CurrentCGPA = ${cgpa} WHERE RegistrationNumber = "${regid}"`
    connection.query(sql,(err,result) => {
        if(err){
            throw err;
        }
        res.send(result);
    })
})

app.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
    connection.connect((err) => {
        if(err){
            throw err;
        }
        console.log('Database connected');
    })
})