const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

const personRoutes = require('./routes/routesPerson')
app.use('/person', personRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' })
})

mongoose
    .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.bqisv.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectamos ao mongoDB!')
        app.listen(3000)
    })
    .catch()
