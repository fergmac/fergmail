const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


// one argument means we are fetching something out of mongoose
// two arguments means we are trying to load something into it
const User = mongoose.model('users');

// take User model and put info into cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// pull that info out of the cookie
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

// new instance of google strategy, pass in configuration how to auth users
// clientID and clientSecret
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // query returns a promise
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
            // we already have a record with given profile id
            return done(null, existingUser);
        }
        // we dont have a user record with this id, make new record
        // new instance of User
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
        }
    )
);

