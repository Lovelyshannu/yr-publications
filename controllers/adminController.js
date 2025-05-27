const User = require('../models/user');
const Article = require('../models/article');
const Certificate = require('../models/certificate');
const Invoice = require('../models/invoice');

exports.dashboard = async (req, res) => {
  const [users, articles, certificates, invoices] = await Promise.all([
    User.find(),
    Article.find(), // You can filter by status: 'pending' if needed
    Certificate.find(),
    Invoice.find()
  ]);

  res.render('admin', {
    stats: {
      users: users.length,
      articles: articles.length,
      certificates: certificates.length,
      invoices: invoices.length
    },
    articles,
    certificates
  });
};
