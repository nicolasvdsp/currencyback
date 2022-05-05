const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/default.json');

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
            jwt.sign({ username: username, email: email, password: password }, config.config.jwt_secret, (err, token) => {
                res.json({
                    status: 'success',
                    message: 'User created',
                    "data": {
                        "token": token,
                    }
                });
            });
        }
       
    });
  


};

const login = async (req, res, next) => {

    //login users
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

   //check if username or email exists
    User.findOne({ $or: [{ username: username }, { email: email }] }, (err, user) => {
        if (err) {
            res.json({
                status: 'error',
                message: err.message,
            });
        }
        else if (!user) {
            res.json({
                status: 'error',
                message: 'User does not exist',
            });
        }
        else {
            //check if password is correct
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.json({
                        status: 'error',
                        message: err.message,
                    });
                }
                else if (result) {
                    jwt.sign({ username: username, email: email, password: password }, config.config.jwt_secret, (err, token) => {
                        res.json({
                            status: 'success',
                            message: 'User logged in',
                            "data": {
                                "token": token,
                            }
                        });
                    });
                }
            });
        }
    }
    );
  





};

module.exports = {
    signup,
    login
};