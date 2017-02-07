var mongoose = require('mongoose'),
    User   = require('../models/user'), // get our mongoose model
    jwt    = require('jsonwebtoken'), // used to create, sign, and verify tokens
    config = require('../../config'),// get our config file
    express 	= require('express'),
    app         = express(),
    db = require('../connection'),
    User   = require('../models/user'), // get our mongoose model
    Helper   = require('../helpers/general'); // get helper

exports.InsertarUsuario = function(req,res){

//connection.query("INSERT INTO `bp_personas` (`idbp_personas`, `username`, `nombre`, `apellido`, `segundoapellido`, `correo`, `pw`, `fkidcatPaises`, `idcatEstado`, `idcatPersonaEstado`, `fecharegistro`, `sexo`, `subcorreo`, `idciudad`, `Ciudad`) VALUES (NULL, NULL, 'Mario', 'Hernandez', 'Iniguez', 'alonsohi@hotmail.com', 'mario123', ' 1', '1', '0', '2017-02-14 00:00:00', '1', 'demo@hotmail.com', NULL, 'mexicali');", function(err, rows, fields) {
var data = req.body;

var usuario = {

 
  username: null,
  nombre: data.firstName, 
  apellido: data.lastName, 
  segundoapellido: null,
  correo:data.email, 
  pw: data.pw, 
  fkidcatPaises: data.ComboPaises,
  idcatEstado:1, 
  idcatPersonaEstado:0,
  //fecharegistro:null, 
  sexo:null, 
  subcorreo:null, 
  idciudad:null, 
  Ciudad:null,
  ip:null
};

db.query('INSERT INTO bp_personas SET ?', usuario, function(err,ress){

  if(!err){

    Helper.Query(function(rows){

        if(rows==null){
          res.status(400);  res.send(err);  throw err;
        }else{
           res.send("");
          console.log('Last insert ID:', ress.insertId);
        }

    },"SELECT idbp_personas , fecharegistro FROM bp_personas ed  order by ed.idbp_personas desc  LIMIT 1",db);

  }else {
   res.status(400);  res.send(err);  throw err;
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

