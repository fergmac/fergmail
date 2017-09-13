const passport = require('passport');

module.exports = app => {
// route handler: attempt to auth user coming in by this route and use google oauth
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
})
);

// 'google' identifier for googleStrategy, user visits this route with 'code'
app.get('/auth/google/callback', passport.authenticate('google'));


app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

};