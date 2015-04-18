// app.js
//  BASIC SETUP
// ============================================================================
// Load required node modules
var express     = require('express'); // Require NodeJS to load express
var app         = express(); // Create an express application called app
var bodyParser  = require('body-parser'); // Require NodeJS to load body-parser
var mongoose    = require('mongoose'); // Require the mongoose module
mongoose.connect('mongodb://localhost/basicAPI'); // MongoDB connection

var Item        = require('./app/models/item') // Require our new Item model

// Now we well our Express APP to use bodyParser with JSON 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set default port to 8080
var port = process.env.PORT || 8080;


// ROUTES FOR OUR API
// ============================================================================
// Here we create an express Router called api
// This will allow us to listen to requests on specific paths
var api = express.Router();

// Middle wear that will run for all requests
api.use(function (req, res, next) {
  // Log all of the things
  console.log('New request made'); // We can add more detail to this later
  next(); // make sure we dont got stuck in the middlewear and use other routes
});

// api routes using /items
// ----------------------------------------------------------------------------
api.route('/items')
  // Listen to post requests on /items
  .post(function (req, res) {
    var item = new Item();     // Create a new insnance of the item model
    item.name = req.body.name; // Lets give this item a name from the post

    // Now that our item has a name lets save it
    item.save(function (err) {
      // We need to check for errors to make sure the item was added
      if (err) {
        res.send(err); // Send the error if one has occurred
      } else {
        res.json({ message: 'Item added!'}); // Send a success message!
      }
    });
  });

// Now we create a basic response for a GET request to  the root of our api
api.get('/', function (req, res) {
  // We are gonig to send a JSON response with the object message
  res.json({ message: 'Invalid Path'}); 
});

// ADD THE ROUTES
// ============================================================================
// Now we well our express app that any request on /api to use our api router
app.use('/api', api);


// START THE SERVER!!
// ============================================================================
// Tell our app to listen on the port specified when launching NodeJS
app.listen(port)
// Log to the console that we are now listening on the port
console.log('API Listening on Port ' + port);