const Article = require('../models/article');
const path = require('path');
const fs = require('fs');

exports.listArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.render('articles', { articles });
  } catch (err) {
    console.error(err);
    res.render('articles', { articles: [] });
  }
};

exports.getUpload = (req, res) => {
  console.log("Session:", req.session);  // Add this line to debug
  if (!req.session || !req.session.user) {
    req.flash('error_msg', 'Please login to upload articles');
    return res.redirect('/login');
  }
  res.render('upload');
};


exports.postUpload = async (req, res) => {
  if (!req.session.user) {
    req.flash('error_msg', 'Please login to upload articles');
    return res.redirect('/login');
  }

  const { title, author, description } = req.body;
  const file = req.file;

  if (!file) {
    req.flash('error_msg', 'No file uploaded');
    return res.redirect('/articles/upload');
  }

  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.includes(ext)) {
    req.flash('error_msg', 'Invalid file type. Only PDF, DOC, DOCX allowed');
    return res.redirect('/articles/upload');
  }

  const uploadDir = path.join(__dirname, '..', 'uploads', 'articles');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
  const uploadPath = path.join(uploadDir, uniqueName);

  try {
    fs.renameSync(file.path, uploadPath); // move from tmp location to permanent one

    const article = new Article({
      title,
      author,
      description,
      filePath: `/uploads/articles/${uniqueName}`,
      submittedBy: req.session.user.id,  // assuming session stores user ID
      status: 'pending' // marked for admin review
    });

    await article.save();

    req.flash('success_msg', 'Article uploaded successfully');
    res.redirect('/articles');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to upload or save article');
    res.redirect('/articles/upload');
  }
};

exports.listPendingArticles = async (req, res) => {
  const articles = await Article.find({ status: 'pending' }).populate('submittedBy');
  res.render('adminReview', { articles });
};

exports.approveArticle = async (req, res) => {
  await Article.findByIdAndUpdate(req.params.id, { status: 'approved' });
  req.flash('success_msg', 'Article approved');
  res.redirect('/articles/admin/review');
};

exports.rejectArticle = async (req, res) => {
  await Article.findByIdAndUpdate(req.params.id, { status: 'rejected' });
  req.flash('success_msg', 'Article rejected');
  res.redirect('/articles/admin/review');
};

