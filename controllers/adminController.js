const User = require('../models/user');
const Article = require('../models/article');
const Certificate = require('../models/certificate');
const Invoice = require('../models/invoice');

exports.dashboard = async (req, res) => {
  try {
    // You can fetch any required data for the dashboard here
    res.render('admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

