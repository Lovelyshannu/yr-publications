const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  filePath: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', articleSchema);
