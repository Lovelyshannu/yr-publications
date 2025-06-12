const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { isAuthenticated } = require('../Middleware/authMiddleware');

const Article = require('../models/article');

router.get('/', articleController.listArticles);

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.render('articles', { articles, user: req.session.user });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to load articles.');
    res.redirect('/');
  }
});

router.get('/upload', isAuthenticated, articleController.getUpload);
router.post('/upload', isAuthenticated, articleController.postUpload);

module.exports = router;
