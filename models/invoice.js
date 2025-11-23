<<<<<<< HEAD
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  articleId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

=======
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  articleId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});

>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
module.exports = mongoose.model('Invoice', invoiceSchema);