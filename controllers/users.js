const User = require('../models/users');

const getAll = (req, res, next) => {

  User.find({}, (err, users) => {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      data: {
        users: users.map((user) => {
          return {
            username: user.username,
            email: user.email,
            balance: user.balance,
          };
        }),
      },
    });
  });
 
};

const signup = (req, res, next) => {
  res.render('index', { title: 'Signup' });
};

module.exports = {
  getAll,
  signup,
};
