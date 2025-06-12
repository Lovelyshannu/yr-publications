const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  filename: String,
  filePath: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // ✅ Replace this:
  // isApproved: { type: Boolean, default: false },

  // ✅ With this:
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending'
  },

  isDeclined: {
    type: Boolean,
    default: false
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);
