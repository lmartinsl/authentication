var express = require('express');
var router = express.Router();
var PersonController = require('../controllers/PersonController');
var ProductController = require('../controllers/ProductController');
var AuthController = require('../controllers/AuthController');

router.use(AuthController.check_token);

router.get('/people', PersonController.all);
router.get('/products', ProductController.all);

module.exports = router;
