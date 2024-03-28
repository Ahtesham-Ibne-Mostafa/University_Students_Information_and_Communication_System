const mysql = require("mysql")
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "", //If you have set xampp password please enter it here
  database: "usicsdb",
});

if (db) {
    console.log("DB CONNECTED")
} else {
    console.log("Failed to connect")
}

module.exports = db
