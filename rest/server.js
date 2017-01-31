// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var cors = require('cors'); 
var authCtrl = require('./auth');  
var middleware = require('./middleware');
var morgan     = require('morgan');



// configure app
var app        = express();
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 
var port     = process.env.PORT || 8080; // set our port


//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
mongoose.connect('mongodb://localhost/test'); // connect to our database
var Bear     = require('./app/models/bear');
var CtrlTst = require('./app/controllers/test');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});


// Rutas de autenticación y login
router.post('/auth/signup', authCtrl.emailSignup);  
router.post('/auth/login', authCtrl.emailLogin);


// Ruta solo accesible si estás autenticado
router.get('/private',middleware.ensureAuthenticated, function(req, res) {

} );

// Iniciamos el servidor y la base de datos
mongoose.connect('mongodb://localhost', function(err) {  
    // Comprobar errores siempre
    app.listen(app.get('port'), function(){
        console.log('Express corriendo en http://localhost:3000');
    });
});




// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(CtrlTst.agregar)

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(CtrlTst.Todos);

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(Buscar)

	// update the bear with this id
	.put(Update)

	// delete the bear with this id
	.delete(Borrar);


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
