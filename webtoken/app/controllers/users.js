var mongoose = require('mongoose'),
    User   = require('../models/user'), // get our mongoose model
    jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
    config = require('../../config'),// get our config file
    express 	= require('express'),
    app         = express(),
    db = require('../connection'),
    User   = require('../models/user'); // get our mongoose model

app.set('superSecret', config.secret); // secret variable

exports.InsertarUsuario = function(req,res){

//connection.query("INSERT INTO `bp_personas` (`idbp_personas`, `username`, `nombre`, `apellido`, `segundoapellido`, `correo`, `pw`, `fkidcatPaises`, `idcatEstado`, `idcatPersonaEstado`, `fecharegistro`, `sexo`, `subcorreo`, `idciudad`, `Ciudad`) VALUES (NULL, NULL, 'Mario', 'Hernandez', 'Iniguez', 'alonsohi@hotmail.com', 'mario123', ' 1', '1', '0', '2017-02-14 00:00:00', '1', 'demo@hotmail.com', NULL, 'mexicali');", function(err, rows, fields) {
console.log(req.body);
var usuario = {

 
  username: 'x',
  nombre: 'x', 
  apellido: 'x', 
  segundoapellido: 'x',
  correo:'x@hotmail.com', 
  pw: 'nose123', 
  fkidcatPaises:1 ,
  idcatEstado:1, 
  idcatPersonaEstado:0,
  fecharegistro:'2017-02-14 00:00:00', 
  sexo:'M', 
  subcorreo:'S', 
  idciudad:0, 
  Ciudad:'x'
};

db.query('INSERT INTO bp_personas SET ?', usuario, function(err,ress){
  if(err)  throw err; 

  console.log('Last insert ID:', ress.insertId);
  if(!err){
    // console.log('bien' );
  // res.json({ok:true});
 
  }else {
  console.log('error');
  ///  res.status(400); res.send(err);

  }
});
}

exports.UsuarioMongoDb = function(req,res){

  var nick = new User({ 
    name: 'chilo', 
    password: '1234',
    admin: true 
  });
  nick.save(function(err) {
    if (err) res.status(400); res.send(err);  throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });


}

