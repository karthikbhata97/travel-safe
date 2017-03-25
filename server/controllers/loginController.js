var User = require('../models/users').users;

module.exports.login = function(req, res) {
  User.findOne({userid: req.body.userid}, function(err, result) {
    if(err) {
      console.log("Error logging in:");
      console.log(err);
      res.end();
    }
    if(!result) {
      res.send({success: false, reason: "Wrong userid"});
    }
    else if(result.password==req.body.password) {
      res.send({success: true, reason: "Success"});
    }
    else {
      res.send({success: false, reason: "Wrong password"});
    }
  })
}
