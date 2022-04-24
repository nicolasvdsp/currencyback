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

// const create = (req, res, next) => {
//     console.log();
//   let user = new User();
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     user.save((err, doc) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(
//             {
//                 "status": 'User created!',
//                 "data": {
//                     "name": doc,
//                 }
//             }
//         );
//     });
// };



module.exports = {
  getAll,
//   create,
};
