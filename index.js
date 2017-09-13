// common js modules on the server side due to no support for ess2015 import in node
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// set up configuration to listen for incoming requests routed to express from node and route to different handlers
const app = express(); 

// require returns a function and we immediately call that function with app
require('./routes/authRoutes')(app);

// in dev use 5000 in production use whatever port heroku is telling us to
const PORT = process.env.PORT || 5000;

app.listen(PORT);