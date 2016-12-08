let mongoose = require('mongoose');

let BlogEntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('BlogEntry', BlogEntrySchema);
