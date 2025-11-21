const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.listBlogs);
router.get('/', blogController.listPosts);
router.get('/:slug', blogController.viewPost);

module.exports = router;
