<<<<<<< HEAD
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  number: { type: String, unique: true },
  recipientName: String,
  issueDate: Date,
  fileData: Buffer,
  fileMimeType: String,
  fileName: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);
=======
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  number: { type: String, unique: true },
  recipientName: String,
  issueDate: Date,
  fileData: Buffer,
  fileMimeType: String,
  fileName: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
