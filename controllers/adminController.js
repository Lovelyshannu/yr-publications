const User = require('../models/user');
const Article = require('../models/article');
const Certificate = require('../models/certificate');
const Invoice = require('../models/invoice');

// Admin dashboard
exports.dashboard = async (req, res) => {
  const users = await User.find();
  const articles = await Article.find();
  const certificates = await Certificate.find();
  const invoices = await Invoice.find();

  const stats = {
    users: users.length,
    articles: articles.length,
    certificates: certificates.length,
    invoices: invoices.length,
  };

  res.render('admin', {
    stats,
    users,
    articles,
    certificates,
  });
};

// List users
exports.listUsers = async (req, res) => {
  const users = await User.find();
  res.render('admin-users', { users });
};

// List articles
exports.listArticles = async (req, res) => {
  const articles = await Article.find().populate('uploader');
  res.render('admin-articles', { articles });
};

// Approve article
exports.approveArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    req.flash('error_msg', 'Article not found');
    return res.redirect('/admin/articles');
  }

  article.isApproved = true;
  await article.save();

  req.flash('success_msg', 'Article approved and now visible publicly');
  res.redirect('/admin/articles');
};

// Publish article
exports.publishArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article || !article.isApproved) {
    req.flash('error_msg', 'Article must be approved first');
    return res.redirect('/admin/articles');
  }

  article.isPublished = true;
  await article.save();
  req.flash('success_msg', 'Article published to public portal');
  res.redirect('/admin/articles');
};

// List certificates
exports.listCertificates = async (req, res) => {
  const certificates = await Certificate.find().populate('uploader');
  res.render('admin-certificates', { certificates });
};

// Generate invoice
exports.generateInvoice = async (req, res) => {
  const articleId = req.params.articleId;
  const article = await Article.findById(articleId).populate('uploader');

  if (!article) {
    req.flash('error_msg', 'Article not found');
    return res.redirect('/admin/articles');
  }

  const price = 1000;

  let invoice = await Invoice.findOne({ article: articleId });
  if (!invoice) {
    invoice = new Invoice({
      article: articleId,
      user: article.uploader._id,
      amount: price,
      date: new Date(),
    });
    await invoice.save();
  }

  res.render('invoice', { invoice, article });
};
