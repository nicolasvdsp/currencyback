const User = require('../models/Users');
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
    //check if username shorter than 6
    if (username.length < 6) {
        return res.status(400).json({
            status: 'error',
            message: 'Username must be at least 6 characters',
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
                console.log(token);
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

    let tokn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imlqc2JlZXIiLCJlbWFpbCI6Imlqc2JlZXJAbGl2ZS5iZSIsInBhc3N3b3JkIjoiVGVzdDEyMzQiLCJpYXQiOjE2NTI5OTAzMDh9.x6q4meXQZfZiwQzP5kPVqRB_OT6zT-2rLsQOABRxPZw";
    let decode = jwt.decode(tokn);
    console.log(decode.username);

    //login users
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

   //check if username or email exists
    User.findOne({ $or: [{ username: username }, { email: email }] }, (err, user) => {
        //check if theres an error
        if (err) {
            res.json({
                status: 'error',
                message: err.message,
            });
        }
        //check if user exists
        else if (!user) {
            res.json({
                status: 'error',
                message: 'User does not exist',
            });
        }
        //check if password is correct
        else if (!bcrypt.compareSync(password, user.password)) {
            res.json({
                status: 'error',
                message: 'Password is incorrect',
            });
        }
        //login user
        else {
            jwt.sign({ username: username, email: email, password: password }, config.config.jwt_secret, (err, token) => {
                res.json({
                    status: 'success',
                    message: 'User logged in',
                    "data": {
                        "token": token,
                    }
                });
            }
            );
        }
 

       
        // if (err) {
        //     res.status(400).json({
        //         status: 'error',
        //         message: err.message,
        //     });
        // }
        // else if (!user) {
        //     res.json({
        //         status: 'error',
        //         message: 'User does not exist',
        //     });
        // }
        // else {
        //     //check if password is correct
        //     bcrypt.compare(password, user.password, (err, result) => {
        //         if (err) {
        //             res.json({
        //                 status: 'error',
        //                 message: err.message,
        //             });
        //         }
        //         else if (result) {
        //             jwt.sign({ username: username, email: email, password: password }, config.config.jwt_secret, (err, token) => {
        //                 res.json({
        //                     status: 'success',
        //                     message: 'User logged in',
        //                     "data": {
        //                         "token": token,
        //                     }
        //                 });
        //             });
        //         }
        //     });
        // }
    }
    );
};

const decodeToken = (token) => {
    const regex = /[\w\.\d]+/g;
    const match = token.match(regex)[1];

    return jwt.decode(match);
}

module.exports = {
    signup,
    login,
    decodeToken
};