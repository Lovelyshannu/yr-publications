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
  res.render('upload', { active: 'articles' });
};

// Handle article upload
exports.postUpload = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const articleFile = req.files.articleFile;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(articleFile.mimetype)) {
      req.flash('error_msg', 'Only PDF or DOCX files are allowed');
      return res.redirect('/articles/upload');
    }

    const newArticle = new Article({
      title,
      author,
      description,
      fileData: articleFile.data,
      fileMimeType: articleFile.mimetype,
      fileName: articleFile.name,
      isApproved: false
    });

    await newArticle.save();
    req.flash('success_msg', 'Article uploaded successfully! Awaiting admin approval.');
    res.redirect('/articles/upload');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Upload failed.');
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

exports.postUpload = async (req, res) => {
  try {
    const userEmail = req.session.user?.email;

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // your gmail or smtp email
        pass: process.env.EMAIL_PASS      // your app-specific password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.session.user.email,
      subject: 'Article Submission Confirmation',
      text: `Hi ${req.session.user.name}, your article has been received and is pending approval.`
    };

    // Send confirmation email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    req.flash('success_msg', 'Article uploaded successfully!');
    res.redirect('/articles/upload');
  } catch (error) {
    console.error(error);
    req.flash('error_msg', 'Article upload failed.');
    res.redirect('/articles/upload');
  }
};