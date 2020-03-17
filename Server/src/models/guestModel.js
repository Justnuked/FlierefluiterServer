const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    period: {
        type: Date,
    },
    dateofbirth: {
        type: Date
    },
    address: {
        type: String
    },
    zipcode: {
        type: String
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
});

const Guest = mongoose.model('guest', GuestSchema);

module.exports = Guest;