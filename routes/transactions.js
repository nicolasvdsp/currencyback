const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactions');



// router.get('/', transactionsController.getAll);
router.get("/", transactionsController.getAll);

router.post("/", transactionsController.create);

module.exports = router;