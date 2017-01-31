var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	name: String,
	name: String
});

module.exports = mongoose.model('User', UserSchema);