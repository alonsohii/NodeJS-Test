var mongoose = require('mongoose');
var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express 	= require('express');
var app         = express();
app.set('superSecret', config.secret); // secret variable
var db = require('../connection');

exports.CatalogoPaises = function(req,res){
	console.log('Llamando funcion');
db.query('SELECT * FROM V_PAISESESTADOS', function(err, rows, fields) {
db.end();

res.json(users);
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
  });
}

