const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    role: { type: String, default: 'user' }, // ['admin', 'moderator', 'user']
    googleId: String,
    thumbnail: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;