const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    zipcode: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    dateofbirth: {
        type: Date
    },
    idnumber: {
        type: String
    },
    idcardorpassport: {
        type: Number
    }
});

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;