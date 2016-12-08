let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
