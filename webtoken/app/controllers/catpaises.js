var mongoose = require('mongoose');
var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express 	= require('express');
var app         = express();
var cors = require('cors');
app.set('superSecret', config.secret); // secret variable
var db = require('../connection');

exports.CatalogoPaises = function(req,res){
	//console.log('Llamando funcion');
db.query('SELECT * FROM V_PAISESESTADOS', function(err, rows, fields) {
//db.end();
  res.setHeader('Content-Type', 'application/json');
 //res.writeHead(200, {'Content-Type': 'text/plain'});

res.json(rows);
//res.header("Access-Control-Allow-Origin", "*");
  if (!err)
  console.log('The solution is: ');
  else
  //	 db.end();
    console.log('Error while performing Query.' + err);
  });
}

