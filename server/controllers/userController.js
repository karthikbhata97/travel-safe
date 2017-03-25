var Place = require('../models/places').places;
var User = require('../models/users').users;
var Comment = require('../models/comments').comments;
var Media = require('../models/comments').media;

module.exports.listPlaces = function(req, res) {
  Place.find({}, function(err, result) {
    if(!result) res.send({});
    else {
      var arr=[];
      for(var i=0;i<result.length;i++) {
        if(Math.abs(result[i].latitude-req.body.latitude)<=10) arr.push(result[i]);
        if(i==result.length-1) res.send(arr);
      }
    }
  });
};

module.exports.ratePlace = function(req, res) {}

module.exports.addComment = function(req, res) {
  User.findOne({userid: req.userid}, function(err, result) {
    var new_comment = {
      user: result._id,
      description: req.comment
    }
    var comment = new Comment(new_comment);
    comment.save(function(err, result) {
      if(err) {
        console.log("Error in saving new comment");
        console.log(err);
        res.end();
      }
      else {
        Place.update({name: req.body.name}, {$push: {comments: req.body.comment}}, function(err, result) {
            if(err) {
              console.log("Failed to update comment");
              res.end();
            }
            else {
              res.send(result);
            }
        })
      }
    })
  })
}
