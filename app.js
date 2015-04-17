// app.js

// Load required node modules
var express     = require('express'); // Require NodeJS to load express
var app         = express(); // Create an express application called app
var bodyParser  = require('body-parser'); // Require NodeJS to load body-parser

// Now we well our Express APP to use bodyParser with JSON 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set default port to 8080
var port = process.env.PORT || 8080;

// Here we create an express Router called api
// This will allow us to listen to requests on specific paths
var api = express.Router();

// Now we create a basic response for a GET request to  the root of our api
api.get('/', function (req, res) {
  // We are gonig to send a JSON response with the object message
  res.json({ message: 'Invalid Path'}); 
});

// Now we well our express app that any request with the base URI of /api to use our api router
app.use('/api', api);

// Tell our app to listen on the port specified when launching NodeJS
app.listen(port)
// Log to the console that we are now listening on the port
console.log('API Listening on Port ' + port);