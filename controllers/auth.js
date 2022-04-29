const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    //check if username not empty or not string
    if (username === '' || typeof username !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: 'Username is required',
        });
    }
    //check if email not empty or not string
    if (email === '' || typeof email !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: 'Email is required',
        });
    }
    //check if password not empty or not string
    if (password === '' || typeof password !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: 'Password is required',
        });
    }

    //validate email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.status(400).json({
            status: 'error',
            message: 'Email is invalid',
        });
    }


    //hash password
    let hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    let newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
    });

    //save user
    newUser.save((err, user) => {
        if (err) {
            if(err.code===11000){
                res.json({
                    status: 'error',
                    message: 'User already exists!',
                });
            }
            else{
                res.json({
                    status: 'error',
                    message: err.message,
               });
            }
        }
        else{
            res.json({
                status: 'success',
                message: 'User created',
            });
        }
       
    });
  


};

const login = async (req, res, next) => {
    //login users
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    jwt.sign({ username: username, email: email, password: password }, '4ccdc24a90dcc77ec568b11f99fe9548987768557ef37b7d0d38ce3baebc4f4ae7b2be80df03184bfbd87f6e8384c4f67cc2664c85fc5ebae0556d76e3fd40fe', (err, token) => {
        res.json({
            "status": 'User logged in!',
            "data": {
                "token": token,
            }
        });
    });

};

module.exports = {
    signup,
    login
};