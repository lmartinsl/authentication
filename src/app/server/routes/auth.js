var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.use(AuthController.check_token);
router.get('/user', AuthController.user_data);

module.exports = router;
