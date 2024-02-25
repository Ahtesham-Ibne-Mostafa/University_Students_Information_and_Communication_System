const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const mysql = require('mysql');
const databaseinfo= require('../database.json')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: databaseinfo.host,
    user: databaseinfo.user,
    password:databaseinfo.password,
    database: databaseinfo.database,
  });

  function signUp(req,res){
    const sentEmail = req.body.Email
    const sentUserName = req.body.UserName
    const sentPassword = req.body.Password

    // Lets create SQL statement to insert the user to the Database table Users
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)'
    const Values = [sentEmail, sentUserName, sentPassword]
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        connection.query(SQL, Values, (err, results) => {
            if(err) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: err
                });
            } else{
                console.log('User inserted successfully!');
                res.status(200).json({
                    message: "User created successfully",
                    
                });

            }})
        })

    

  }

  function login(req,res){

  }

  module.exports = {
    signUp: signUp,
    login: login
}