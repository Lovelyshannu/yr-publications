const Article = require('../models/article');
const path = require('path');
const fs = require('fs');

exports.listArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ uploadDate: -1 });
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

  if (!req.files || !req.files.articleFile) {
    req.flash('error_msg', 'No file uploaded');
    return res.redirect('/articles/upload');
  }

  const articleFile = req.files.articleFile;

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (!allowedTypes.includes(articleFile.mimetype)) {
    req.flash('error_msg', 'Invalid file type. Allowed PDF, DOC, DOCX');
    return res.redirect('/articles/upload');
  }

  // Make sure the directory exists
  const uploadDir = path.join(__dirname, '..', 'uploads', 'articles');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Create a unique filename to avoid overwriting
  const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(articleFile.name);
  const uploadPath = path.join(uploadDir, uniqueName);

  router.post('/upload', (req, res, next) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send(err.message);
    } else if (err) {
      return res.status(400).send(err.message);
    }
    next();
  });
  }, (req, res) => {
  // rest of your code here
  });

  articleFile.mv(uploadPath, async err => {
    if (err) {
      console.error(err);
      req.flash('error_msg', 'File upload failed');
      return res.redirect('/articles/upload');
    }

    try {
      const article = new Article({
        title,
        author,
        description,
        filePath: `/uploads/articles/${uniqueName}`
      });

      await article.save();
      req.flash('success_msg', 'Article uploaded successfully');
      res.redirect('/articles');
    } catch (err) {
      console.error(err);
      // Delete the file if DB save fails
      fs.unlinkSync(uploadPath);
      req.flash('error_msg', 'Failed to save article');
      res.redirect('/articles/upload');
    }
  });
};
