var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
  'name': String,
  'country': String,
  'email': String,
  'company': String
});

module.exports = mongoose.model('Person', PersonSchema);
