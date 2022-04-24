const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
/* GET users listing. */
router.get('/', userController.getAll);

//make post request to /users
router.post('/',userController.create);


module.exports = router;
