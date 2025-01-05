const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//User Schema
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    password: {type: String, required: true, minlength: 6},
    createdAt: {type: Date, default: Date.now}
});

//Hash the password before saving
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Compare passwords for login
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//Export the User model
module.exports = mongoose.model('User', UserSchema);