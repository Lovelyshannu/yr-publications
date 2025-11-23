<<<<<<< HEAD
const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Blog', blogSchema);
=======
const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Blog', blogSchema);
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
