var mongoose = require('mongoose');
var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../../config'); // get our config file
var express 	= require('express');
var app         = express();
app.set('superSecret', config.secret); // secret variable
var db = require('../connection');



exports.InsertarUsuario = function(req,res){

//connection.query("INSERT INTO `bp_personas` (`idbp_personas`, `username`, `nombre`, `apellido`, `segundoapellido`, `correo`, `pw`, `fkidcatPaises`, `idcatEstado`, `idcatPersonaEstado`, `fecharegistro`, `sexo`, `subcorreo`, `idciudad`, `Ciudad`) VALUES (NULL, NULL, 'Mario', 'Hernandez', 'Iniguez', 'alonsohi@hotmail.com', 'mario123', ' 1', '1', '0', '2017-02-14 00:00:00', '1', 'demo@hotmail.com', NULL, 'mexicali');", function(err, rows, fields) {

var usuario = {

 
  username: 'Mario',
  nombre: 'Alonso', 
  apellido: 'Hernandez', 
  segundoapellido: 'Iniguez',
  correo:'alonsohi@hotmail.com', 
  pw: 'nose123', 
  fkidcatPaises:1 ,
  idcatEstado:1, 
  idcatPersonaEstado:0,
  fecharegistro:'2017-02-14 00:00:00', 
  sexo:'M', 
  subcorreo:'S', 
  idciudad:0, 
  Ciudad:'mexicali'
};

db.query('INSERT INTO bp_personas SET ?', usuario, function(err,ress){
  if(err) throw err;

  console.log('Last insert ID:', ress.insertId);
  if(!err){
   res.json({ok:true});
  }
});
}

