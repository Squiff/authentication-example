const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: [true, 'Email is Required'] },
    password: String,
});

// Register 'User' collection with mongoose for use in app -> mongoose.model.User
module.exports = mongoose.model('User', UserSchema);
