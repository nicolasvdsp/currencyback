const User = require('../models/users');

const signup = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    const user = new User({username: username});
    await user.setPassword(password);
    await user.save().then(() => {
        res.json({
            "status": 'User created!',
            "data": {
                "name": user,
                    }
        });
    }).catch(err => {
        res.send(err);
    });
};

const login = async (req, res, next) => {
const user = await User.authenticate()(req.body.username, req.body.password).then(result => {
    res.json({
        "status": 'User found!',
        "data": {
            "user": result,
        }

});
}).catch(err => {
    res.send(err);
    });
    };

module.exports = {
    signup,
    login
};