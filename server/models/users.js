var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var userSchema = new schema ({
    userid: {type: String, index: { unique: true, dropDups: true}},
    password: String
    
});

module.exports.users = mongoose.model('user', userSchema);

