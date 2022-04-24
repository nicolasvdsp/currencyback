const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

const getAll = (req, res, next) => {
  res.send("respond with a resource");
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
