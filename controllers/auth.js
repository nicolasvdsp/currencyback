const User = require('../models/users');

const signup = async (req, res, next) => {
    // let username = req.body.username;
    // let password = req.body.password;

    // const user = new User({username: username});
    // await user.setPassword(password);
    // await user.save().then(() => {
    //     res.json({
    //         "status": 'User created!',
    //         "data": {
    //             "name": user,
    //                 }
    //     });
    // }).catch(err => {
    //     res.send(err);
    // });

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
        res.send(err);
    }
    );



};

const login = async (req, res, next) => {
//login users
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({username: username}, (err, user) => {
        if (err) {
            res.json({
                status: 'error',
                message: err,
            });
        }
        if (!user) {
            res.json({
                status: 'error',
                message: 'User not found!',
            });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                res.json({
                    status: 'error',
                    message: err,
                });
            }
            if (isMatch) {
                res.json({
                    status: 'success',
                    message: 'User found!',
                    data: {
                        "name": user,
                    }
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'Wrong password!',
                });
            }
        });
    });




};

module.exports = {
    signup,
    login
};