const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  courseName: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  filePath: { type: String, required: true }
});

module.exports = mongoose.model('Certificate', certificateSchema);
