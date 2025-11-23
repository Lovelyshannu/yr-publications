<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContactPage);
router.post('/', contactController.postContactForm);

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', contactController.getContactPage);
router.post('/', contactController.postContactForm);

module.exports = router;
>>>>>>> 8a9e90c07382fcc1680dca1297dc6fed58336e68
