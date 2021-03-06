const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const authController = require('../controllers/auth');

/* GET users listing. */
router.get('/', userController.getAll);
router.get('/getallbybalance', userController.getAllByBalance);

router.post('/getUserByToken', authController.getUserByToken);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
module.exports = router;
