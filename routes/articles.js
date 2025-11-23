<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { isAuthenticated, isAdmin } = require('../Middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const Article = require('../models/article');

// Download route (admin only)
router.get('/download/:id', isAuthenticated, isAdmin, async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).send('Article not found');
  res.set('Content-Type', article.fileMimeType);
  res.set('Content-Disposition', `attachment; filename="${article.fileName}"`);
  res.send(article.fileData);
});

// Upload routes
router.get('/upload', isAuthenticated, articleController.getUpload);   
router.post('/upload', isAuthenticated, articleController.postUpload);

// Admin decline article
router.post('/articles/:id/decline', isAuthenticated, isAdmin, adminController.declineArticle);

// 🔻 LAST: generic ID route
router.get('/:id', articleController.viewArticle);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { isAuthenticated, isAdmin } = require('../Middleware/authMiddleware');
const adminController = require('../controllers/adminController');
const Article = require('../models/article');

// Download route (admin only)
router.get('/download/:id', isAuthenticated, isAdmin, async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).send('Article not found');
  res.set('Content-Type', article.fileMimeType);
  res.set('Content-Disposition', `attachment; filename="${article.fileName}"`);
  res.send(article.fileData);
});

// Upload routes
router.get('/upload', isAuthenticated, articleController.getUpload);   
router.post('/upload', isAuthenticated, articleController.postUpload);

// Admin decline article
router.post('/articles/:id/decline', isAuthenticated, isAdmin, adminController.declineArticle);

// 🔻 LAST: generic ID route
router.get('/:id', articleController.viewArticle);

module.exports = router;
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
