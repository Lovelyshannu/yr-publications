const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const articles = await Article.find({ isApproved: true }).sort({ createdAt: -1 });

res.render('articles', { articles, user: req.session.user });

router.get('/documents', async (req, res) => {
  const articles = await Article.find({ isPublished: true });
  res.render('public-documents', { articles });
});

module.exports = router;
