var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commentSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  description: String
});

module.exports.comments = mongoose.model('Comment', commentSchema);
