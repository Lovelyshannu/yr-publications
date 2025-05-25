const articleController = require('../controllers/articleController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  // Save article data here or send response
  res.send('File uploaded successfully: ' + req.file.filename);
});

module.exports = router;

// List articles
router.get('/', articleController.listArticles);

// Upload article page
router.get('/upload', articleController.getUpload);

// Handle upload article POST
router.post('/upload', articleController.postUpload);

module.exports = router;
