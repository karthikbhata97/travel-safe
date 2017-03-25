var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var userSchema = new Schema ({
    userid: {type: String, index: {unique: true, dropDups: true}},
    password: String
});

module.exports.users = mongoose.model('User', userSchema);
