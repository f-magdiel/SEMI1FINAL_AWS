require('dotenv').config()
const mysql = require('mysql2')


let db_credentials = {
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
}

var conn = mysql.createPool(db_credentials)
module.exports = conn