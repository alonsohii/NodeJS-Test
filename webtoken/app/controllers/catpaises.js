var mongoose = require('mongoose');
var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express 	= require('express');
var app         = express();
var cors = require('cors');
app.set('superSecret', config.secret); // secret variable
var db = require('../connection');
var geoip = require('geoip-lite');
var requestIp = require('request-ip');

exports.CatalogoPaises = function(req,res){
	//console.log('Llamando funcion');
db.query('select * from v_paisesestados order by Nombre , nombreEstado', function(err, rows, fields) {
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

exports.Visitante = function(req,res){
console.log(requestIp.getClientIp(req));
var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] ;
res.json( requestIp.getClientIp(req));
}



function getClientIp(req) {
  var ipAddress;
  // The request may be forwarded from local web server.
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};