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

const create = (req, res, next) => {
  let user = new User();
    user.name = "John";
    user.email = "email";
    user.password = "password";
    user.save((err, doc) => {
        if (err) {
            res.send(err);
        }
        res.json(
            {
                "status": 'User created!',
                "data": {
                    "name": doc,
                }
            }
        );
    });
};
    

module.exports = {
  getAll,
  create,
};
