var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var placeSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  rating: Number,
  numberOfRating: Number,
  description: String
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports.places = mongoose.model('Place', placeSchema);
