const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

router.get('/', certificateController.getCertificateForm);
router.post('/', certificateController.postCertificateVerification);
router.get('/upload', certificateController.getUploadForm);
router.post('/upload', certificateController.postUpload);

module.exports = router;
