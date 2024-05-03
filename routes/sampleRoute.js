const express = require('express');
const router = express.Router();
const sampleController = require('../controllers/sampleController');

router.get('/samples', sampleController.getSample);

module.exports = router;
