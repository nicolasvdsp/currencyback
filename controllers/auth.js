const User = require('../models/users');

const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    //register users
    const user = new User({username: username, email: email, password: password});
  
   
    //save user to database
    await user.save().then(() => {
        res.json({
            "status": 'User created!',
            "data": {
                "name": user,
            }
        });
    }).catch(err => {
        res.send(err.message);
    }
    );



};

const login = async (req, res, next) => {
//login users
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    jwt.sign({username: username, email: email, password: password}, '4ccdc24a90dcc77ec568b11f99fe9548987768557ef37b7d0d38ce3baebc4f4ae7b2be80df03184bfbd87f6e8384c4f67cc2664c85fc5ebae0556d76e3fd40fe', (err, token) => {
        res.json({
            "status": 'User logged in!',
            "data": {
                "token": token,
            }
        });
    });


    // User.findOne({username: username}, (err, user) => {
    //     if (err) {
    //         res.json({
    //             status: 'error',
    //             message: err,
    //         });
    //     }
    //     if (!user) {
    //         res.json({
    //             status: 'error',
    //             message: 'User not found!',
    //         });
    //     }
    //     user.comparePassword(password, (err, isMatch) => {
    //         if (err) {
    //             res.json({
    //                 status: 'error',
    //                 message: err,
    //             });
    //         }
    //         if (isMatch) {
    //             res.json({
    //                 status: 'success',
    //                 message: 'User found!',
    //                 data: {
    //                     "name": user,
    //                 }
    //             });
    //         } else {
    //             res.json({
    //                 status: 'error',
    //                 message: 'Wrong password!',
    //             });
    //         }
    //     });
    // });




};

module.exports = {
    signup,
    login
};