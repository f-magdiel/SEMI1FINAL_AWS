require('dotenv').config()

var express = require('express')
var bodyParser = require('body-parser')
var rds = require('./routes/rds.routes.js')
var s3 = require('./routes/s3.routes.js')

var app = express()

// MIDDLEWARES
app.set('port', process.env.PORT || 5000)
const cors = require('cors')
var corsOptions = { origin: true, optionsSuccessStatus: 200 }
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use('/rds', rds)
app.use('/s3', s3)

module.exports = app
