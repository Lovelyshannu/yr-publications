<<<<<<< HEAD
const mongoose = require('mongoose');

const PlagCertSchema = new mongoose.Schema({
  certId: String,
  score: Number,
  filePath: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PlagiarismCert', PlagCertSchema);
=======
const mongoose = require('mongoose');

const PlagCertSchema = new mongoose.Schema({
  certId: String,
  score: Number,
  filePath: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PlagiarismCert', PlagCertSchema);
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
