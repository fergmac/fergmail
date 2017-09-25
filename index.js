// common js modules on the server side due to no support for ess2015 import in node
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// declare model first to avoid schema not registered  error
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

// set up configuration to listen for incoming requests routed to express from node and route to different handlers
const app = express(); 

// incoming request payload set to req.body
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// require returns a function and we immediately call that function with app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);


// set up so express handles everything in production correctly
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up  the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// in dev use 5000 in production use whatever port heroku is telling us to
const PORT = process.env.PORT || 5000;

app.listen(PORT);