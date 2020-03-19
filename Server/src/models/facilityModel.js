const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacilitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    amountavailable: {
        type: Number
    },
    amounttotal: {
        type: Number,
    },
});

const Facility = mongoose.model('facility', FacilitySchema);

module.exports = Facility;