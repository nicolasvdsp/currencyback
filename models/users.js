const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user schema
const User = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true,
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
        default: 10,
    },
    

});


User.index({ username: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('User', User);