<<<<<<< HEAD
const Article = require('../models/article');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

// List all approved articles (for user view)
exports.listArticles = async (req, res) => {
  let query = { status: 'approved' };

  if (req.query.search) {
    const search = req.query.search;
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } }
    ];
  }

  const articles = await Article.find(query).sort({ createdAt: -1 });
  res.render('articles', {
    articles,
    user: req.session.user,
    active: 'articles'  // 👈 include this if nav uses it
  });
};

// Upload page
exports.getUpload = (req, res) => {
  res.render('upload', {
    active: 'articles',
    user: req.session.user,
    success_msg: req.flash('success_msg'),
    error_msg: req.flash('error_msg')
  });
};


// Handle article upload
exports.postUpload = async (req, res) => {
  try {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    const { title, author, description } = req.body;
    const file = req.files?.articleFile;

    if (!file) {
      req.flash('error_msg', 'No file uploaded.');
      return res.redirect('/articles/upload');
    }

    const newFileName = Date.now() + '_' + file.name;
    const uploadPath = path.join(__dirname, '..', 'uploads/articles', newFileName);

    await file.mv(uploadPath);

    const newArticle = new Article({
      title,
      author,
      description,
      filePath: `/uploads/articles/${newFileName}`,
      uploadDate: new Date(),
      uploadedBy: req.user._id
    });

    await newArticle.save();
    console.log("Article saved successfully!");

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: 'Article Submission Confirmation',
      text: `Hi ${req.user.name}, your article "${title}" was submitted successfully.`
    });

    console.log("Email sent successfully");
    req.flash('success_msg', 'Article uploaded and confirmation email sent.');
    res.redirect('/articles/upload');
  } catch (err) {
    console.error("Upload error:", err);
    req.flash('error_msg', 'Something went wrong while uploading.');
    res.redirect('/articles/upload');
  }
};


// Decline article
exports.declineArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    req.flash('error_msg', 'Article not found');
    return res.redirect('/admin/articles');
  }

  article.status = 'declined';
  await article.save();

  req.flash('success_msg', 'Article declined');
  res.redirect('/admin/articles');
};

// View individual approved article
exports.viewArticle = async (req, res) => {
  const article = await Article.findById(req.params.id).populate('uploader');

  if (!article || article.status !== 'approved') {
    req.flash('error_msg', 'Article not found or not approved.');
    return res.redirect('/articles');
  }

  res.render('view-article', {
    article,
    user: req.session.user,
    active: 'articles'
  });
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});
=======
const Article = require('../models/article');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

// List all approved articles (for user view)
exports.listArticles = async (req, res) => {
  let query = { status: 'approved' };

  if (req.query.search) {
    const search = req.query.search;
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } }
    ];
  }

  const articles = await Article.find(query).sort({ createdAt: -1 });
  res.render('articles', {
    articles,
    user: req.session.user,
    active: 'articles'  // 👈 include this if nav uses it
  });
};

// Upload page
exports.getUpload = (req, res) => {
  res.render('upload', {
    active: 'articles',
    user: req.session.user,
    success_msg: req.flash('success_msg'),
    error_msg: req.flash('error_msg')
  });
};


// Handle article upload
exports.postUpload = async (req, res) => {
  try {
    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    const { title, author, description } = req.body;
    const file = req.files?.articleFile;

    if (!file) {
      req.flash('error_msg', 'No file uploaded.');
      return res.redirect('/articles/upload');
    }

    const newFileName = Date.now() + '_' + file.name;
    const uploadPath = path.join(__dirname, '..', 'uploads/articles', newFileName);

    await file.mv(uploadPath);

    const newArticle = new Article({
      title,
      author,
      description,
      filePath: `/uploads/articles/${newFileName}`,
      uploadDate: new Date(),
      uploadedBy: req.user._id
    });

    await newArticle.save();
    console.log("Article saved successfully!");

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: 'Article Submission Confirmation',
      text: `Hi ${req.user.name}, your article "${title}" was submitted successfully.`
    });

    console.log("Email sent successfully");
    req.flash('success_msg', 'Article uploaded and confirmation email sent.');
    res.redirect('/articles/upload');
  } catch (err) {
    console.error("Upload error:", err);
    req.flash('error_msg', 'Something went wrong while uploading.');
    res.redirect('/articles/upload');
  }
};


// Decline article
exports.declineArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    req.flash('error_msg', 'Article not found');
    return res.redirect('/admin/articles');
  }

  article.status = 'declined';
  await article.save();

  req.flash('success_msg', 'Article declined');
  res.redirect('/admin/articles');
};

// View individual approved article
exports.viewArticle = async (req, res) => {
  const article = await Article.findById(req.params.id).populate('uploader');

  if (!article || article.status !== 'approved') {
    req.flash('error_msg', 'Article not found or not approved.');
    return res.redirect('/articles');
  }

  res.render('view-article', {
    article,
    user: req.session.user,
    active: 'articles'
  });
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
