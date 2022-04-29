const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user schema
const User = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    balance: {
        type: Number,
        default: 0,
    },
    

});


module.exports = mongoose.model('User', User);