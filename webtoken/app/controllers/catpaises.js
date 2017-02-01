var mongoose = require('mongoose');
var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express 	= require('express');
var app         = express();
app.set('superSecret', config.secret); // secret variable
var mysql 	= require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'nose1234',
  database : 'projectb'
});


connection.connect(function(err){
	if(!err) {
	    console.log("Database is connected ... nn");    
	} else {
	    console.log("Error connecting database ... nn");    
	}
});

exports.CatalogoPaises = function(req,res){
	console.log('Llamando funcion');
connection.query('SELECT * FROM V_PAISESESTADOS', function(err, rows, fields) {
connection.end();

res.json(users);
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
  });
}

