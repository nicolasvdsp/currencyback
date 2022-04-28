const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create user schema
const User = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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