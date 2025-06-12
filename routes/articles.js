const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { isAuthenticated } = require('../Middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const Article = require('../models/article');

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
router.post('/articles/:id/decline', isAuthenticated, isAdmin, adminController.declineArticle);

module.exports = router;
