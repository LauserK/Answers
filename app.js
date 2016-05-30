var express = require("express");
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var cors = require('cors');

/* Config Express */
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

/* Routers */
var router = express.Router();

router.get('/', function(req, res) {
   res.send("Welcome to KildareAnswers API");   
});

app.use('/api', router);

// Connect to database and run the app
mongoose.connect('mongodb://localhost/answers', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }

  app.listen(9000, function() {
  	console.log('Connected to Database');
    console.log("Node server running on http://localhost:9000");
  });
});