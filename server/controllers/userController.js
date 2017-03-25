var Place = require('../models/places').places;
var User = require('../models/users').users;
var Comment = require('../models/comments').comments;
var Media = require('../models/comments').media;
var url = require('url');

module.exports.listPlaces = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var mylat = url_parts.query.latitude;
  var mylong = url_parts.query.longitude;
  Place.find({}).populate({
    path: 'comments',
    model: 'Comment'
  }).exec(function(err, result) {
    if(!result) res.send({});
    else {
      var arr=[];
      for(var i=0;i<result.length;i++) {
        if(Math.abs(result[i].latitude-mylat)<=1&&Math.abs(result[i].longitude-mylong)<=1) {
          arr.push(result[i]);
        }
        if(i==result.length-1) {
          res.send(arr);
        }
      }
    }
  });
};

module.exports.ratePlace = function(req, res) {
  Place.findOne({name: req.name}, function(err, result) {
    if(err) {
      console.log("Error finding places");
      console.log(err);
    }
    else {
      var new_data = result;
      new_data.numberOfRating = result.numberOfRating+1;
      new_data.rating = (result.numberOfRating * result.rating + req.rate)/new_data.numberOfRating;
      Place.update(result, {$set: {numberOfRating: new_data.numberOfRating, rate: new_data.rating}}, function(err, result) {
        if(err) {
          console.log("Error");
          console.log(err);
        }
        else {
          res.send(result);
        }
      })
    }
  })
}

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
