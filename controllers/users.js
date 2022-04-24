const User = require('../models/users');

const getAll = (req, res, next) => {
  User.find({"user": "Bob"}, (err, docs) => {
    if (err) {
      res.send(err);
    }
    res.json(
      {
        "status": 'User found!',
        "data": {
          "name": docs,
        }
      }
    );
  });
 
};

module.exports = {
  getAll,
};
