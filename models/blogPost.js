const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  author: String,
  content: String,
  excerpt: String,
  createdAt: { type: Date, default: Date.now },
  coverImage: String // optional
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
