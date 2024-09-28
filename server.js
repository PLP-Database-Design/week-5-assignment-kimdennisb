const express = require('express')
const app = express()

const mysql = require('mysql2');
const dotenv = require('dotenv')


// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// test the connection
db.connect((err) => {
    // connection is not successful
    if (err) {
        return console.log("Error connecting to the database: ", err)
    }

    // connection is successful
    console.log("Successfully connected to MySQL: ", db.threadId)
});

// this is not important for the assignment
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



// Question 1 goes here
// retrieve all patients
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id,first_name, last_name,date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        // if I have an error 
        if (err) {
            return res.status(400).send("Failed to get patients", err)
        }

        res.status(200).render('patients.ejs', { data: data })
    })
})


// Question 2 goes here
//retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name,provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        // if I have an error 
        if (err) {
            return res.status(400).send("Failed to get providers", err)
        }

        res.status(200).render('providers.ejs', { data: data })
    })
})

// Question 3 goes here
app.get('/patientsbyfirstname/:name', (req, res) => {
    const getPatientByFirstName = `SELECT * FROM patients WHERE first_name = '${req.params.name}'`;
    db.query(getPatientByFirstName, (err, data) => {
        // if I have an error 
        if (err) {
            return res.status(400).send("Failed to get patient by first name", err)
        }

        res.status(200).render('patientsfirstname.ejs', { data: data })
    })
})

// Question 4 goes here
app.get('/providersbyspecialty/:specialty', (req, res) => {
    const getProvidersBySpecialty = `SELECT * FROM providers WHERE provider_specialty = '${req.params.specialty}'`;
    db.query(getProvidersBySpecialty, (err, data) => {
        // if I have an error 
        if (err) {
            return res.status(400).send("Failed to get providers by specialty", err)
        }

        res.status(200).render('providersspecialty.ejs', { data: data })
    })
})

// listen to the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`server is runnig on http://localhost:${PORT}`)
})