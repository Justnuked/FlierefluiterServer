const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    const temp = this.password;

    var hash = crypto.createHmac('sha256', 'secretsalt').update(temp).digest('hex');
    this.password = hash;

    next();
});

UserSchema.methods.comparePassword = function (password) {
    var hash = crypto.createHmac('sha256', 'secretsalt').update(password).digest('hex');

    if (this.password === hash)
    {
        return true;
    } else
    {
        return false;
    }
};

const User = mongoose.model('user', UserSchema);

module.exports = User;