<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.listBlogs);
router.get('/', blogController.listPosts);
router.get('/:slug', blogController.viewPost);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.listBlogs);
router.get('/', blogController.listPosts);
router.get('/:slug', blogController.viewPost);

module.exports = router;
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
