// app/models/item.js

// Again we load our required node_moudels
var mongoose  = require('mongoose'); // Include the mongoose module
var Schema    = mongoose.Schema; // Shortcut to mongoose schemas


// Now we will create our item model
var ItemSchema = new Schema({
  name: String
});

// Export the Item model to be used in our api
module.exports = mongoose.model('Item', ItemSchema);