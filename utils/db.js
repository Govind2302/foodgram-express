const mysql2 = require('mysql2')
const pool = mysql2.createPool({
    host:'localhost' , 
    user:'FDS_ADMIN' ,
    password:'metsyssdf'  ,
    database:'food_delivery_system'
})

module.exports = pool