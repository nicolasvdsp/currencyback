const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    "status": "success",
    "message": "This is the users route",
    "data": [],
  })
});

//make post request to /users
router.post('/', (req, res, next) => {
  res.json({
    "status": "success",
    "message": "This is the users route",
    "data": [],
  })
});


module.exports = router;
