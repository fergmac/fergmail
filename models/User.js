const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});
// telling mongoose we want to create new collection called users
mongoose.model('users', userSchema);