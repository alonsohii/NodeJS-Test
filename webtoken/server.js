// =================================================================
// get the packages we need ========================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var config = require('./config'); // get our config file
var path    = require("path");

var User   = require('./app/models/user'); // get our mongoose model

var AutCtrl = require('./app/controllers/aut');
var UsuariosCtrl = require('./app/controllers/users');
var PaisesCtrl = require('./app/controllers/catpaises');

var Middleware = require('./app/middleware');

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =================================================================
// routes ==========================================================
// =================================================================
app.get('/setup', function(req, res) {

	// create a sample u
	var nick = new User({ 
		name: 'chilo', 
		password: '1234',
		admin: true 
	});
	nick.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});



app.get('/paises', PaisesCtrl.CatalogoPaises );
app.get('/usuario', UsuariosCtrl.InsertarUsuario );

// basic route (http://localhost:8080)



app.get('/registro',function(req,res){
  res.sendFile(path.join(__dirname+'/app/views/registro.html'));
  //__dirname : It will resolve to your project folder.
});


app.get('/demo',function(req,res){
  res.sendFile(path.join(__dirname+'/app/views/registro.html'));
  //__dirname : It will resolve to your project folder.
});
// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------

var apiRoutes = express.Router(); 

// ---------------------------------------------------------
// authentication (no middleware necessary since this isnt authenticated)
// ---------------------------------------------------------
// http://localhost:8080/api/authenticate
apiRoutes.post('/authenticate', AutCtrl.autentificar);

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(Middleware.Verificar);

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});

apiRoutes.get('/check', function(req, res) {
	res.json(req.decoded);
});

app.use('/api', apiRoutes);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
