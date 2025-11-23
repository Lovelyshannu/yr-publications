<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // memory storage
const certController = require('../controllers/certificateController');
const certificateController = require('../controllers/certificateController');
const { isAuthenticated, isAdmin } = require('../Middleware/authMiddleware');

router.get('/', certificateController.getVerifyPage);
router.post('/verify', certificateController.verifyCertificate);

router.get('/upload', isAuthenticated, isAdmin, certificateController.getUploadPage); 
router.post('/upload', isAuthenticated, isAdmin, certificateController.handleUpload); 

=======
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // memory storage
const certController = require('../controllers/certificateController');
const certificateController = require('../controllers/certificateController');
const { isAuthenticated, isAdmin } = require('../Middleware/authMiddleware');

router.get('/', certificateController.getVerifyPage);
router.post('/verify', certificateController.verifyCertificate);

router.get('/upload', isAuthenticated, isAdmin, certificateController.getUploadPage); 
router.post('/upload', isAuthenticated, isAdmin, certificateController.handleUpload); 

>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
module.exports = router;