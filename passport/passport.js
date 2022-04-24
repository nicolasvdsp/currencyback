const passport = require('passport');
const User = require('../models/users');

//passport use
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());