var Place = require('../models/places').places;
var User = require('../models/users').users;
var Comment = require('../models/comments').comments;
var Media = require('../models/comments').media;
var url = require('url');


module.exports.myPlace = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var mylat = url_parts.query.latitude;
  var mylong = url_parts.query.longitude;
  var myaddr = url_parts.query.address;
  Place.findOne({latitude: mylat, longitude: mylong}).populate({
    path: 'comments',
    model: 'Comment'
  }).exec(function(err, result) {
    if(err) {
      console.log("Failed to find my place");
      console.log(err);
    }
    else {
      if(!result) {
        var new_place = {
          latitude: mylat,
          longitude: mylong,
          address:  myaddr,
          rating: 0,
          safety: 0,
          numberOfSafetyRating: 0,
          numberOfGenRating: 0
        }
        var place = new Place(new_place);
        place.save(function(err, result) {
          if(err) {
            console.log("Failed to addd new place");
            console.log(err);
          }
          else {
            console.log(result);
            res.send([result]);
          }
        })
      }
      else {
        console.log(result);
        res.send([result]);
      }
    }
  })
}


module.exports.listPlaces = function(req, res) {
  var url_parts = url.parse(req.url, true);
  var mylat = url_parts.query.latitude;
  var mylong = url_parts.query.longitude;
  var myaddr = url_parts.query.address;
  Place.find({}).populate({
    path: 'comments',
    model: 'Comment'
  }).exec(function(err, result) {
    if(!result) res.send({});
    else {
      var arr=[];
      for(var i=0;i<result.length;i++) {
        if(Math.abs(result[i].latitude-mylat)>=0&&Math.abs(result[i].longitude-mylong)>=0) {
          arr.push(result[i]);
        }
        if(i==result.length-1) {
          res.send(arr);
        }
      }
    }
  });
};

module.exports.generalRatePlace = function(req, res) {
  Place.findOne({latitude: req.body.latitude, longitude: req.body.longitude}, function(err, result) {
    if(err) {
      console.log("Error finding places");
      console.log(err);
    }
    else {
      var new_data = result;
      new_data.numberOfGenRating = result.numberOfGenRating+1;
      new_data.rating = (result.numberOfGenRating * result.rating + req.body.rate)/new_data.numberOfGenRating;
      Place.update(result, {$set: {numberOfGenRating: new_data.numberOfGenRating, rate: new_data.rating}}, function(err, result) {
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

module.exports.safetyRatePlace = function(req, res) {
  Place.findOne({latitude: req.body.latitude, longitude: req.body.longitude}, function(err, result) {
    if(err) {
      console.log("Error finding places");
      console.log(err);
    }
    else {
      var new_data = result;
      new_data.numberOfSafetyRating = result.numberOfSafetyRating + 1;
      new_data.safety = (result.numberOfSafetyRating * result.safety + req.body.safety)/new_data.numberOfSafetyRating;
      Place.update(result, {$set: {numberOfSafetyRating: new_data.numberOfSafetyRating, safety: new_data.safety}}, function(err, result) {
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
  User.findOne({userid: req.body.userid}, function(err, result) {
    var new_comment = {
      user: result._id,
      description: req.body.comment
    }
    var comment = new Comment(new_comment);
    comment.save(function(err, result) {
      if(err) {
        console.log("Error in saving new comment");
        console.log(err);
        res.end();
      }
      else {
        Place.update({latitude: req.body.latitude, longitude: req.body.longitude}, {$push: {comments: req.body.comment}}, function(err, result) {
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
