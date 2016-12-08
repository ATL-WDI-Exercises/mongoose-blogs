let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;

let CommentSchema = new mongoose.Schema({
  text:      { type: String, required: true },
  blogEntry: { type: ObjectId, ref: 'BlogEntry', required: true },
  user:      { type: ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);
