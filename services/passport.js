const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


// one argument means we are fetching something out of mongoose
// two arguments means we are trying to load something into it
const User = mongoose.model('users');

// new instance of google strategy, pass in configuration how to auth users
// clientID and clientSecret
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // new instance of User
            new User({ googleId: profile.id }).save();
        }
    )
);

