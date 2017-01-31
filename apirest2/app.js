var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/tvshows', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});



// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/tvshow')(app, mongoose);
var TVShowCtrl = require('./controllers/tvshows');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});


router.post('/demo', function(req, res) {
  res.send("vergas");
})


router.get('/add', function(req, res) {
    //.post(TVShowCtrl.addTVShow);
  //  res.send("Agregando");

});


router.post('/adduser', function(req, res) {
 /// console.log('adduser');
  res.send("a la madre");
    var db = req.db;
    var collection = db.get('tvshows');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

app.use('/',router);
  
 // .post(TVShowCtrl.addTVShow);

/*tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use(tvshows);*/

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
