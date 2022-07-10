var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  'firstName': String,
  'lastName': String,
  'address': String,
  'city': String,
  'state': String,
  'phone': String,
  'mobilephone': String,
  'email': String,
  'password': String
});

module.exports = mongoose.model('User', UserSchema);
