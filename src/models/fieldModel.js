const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    area: [{
        type: String
    }],
    squaremeters: {
        type: Number
    },
    AMP6: {
        type: Boolean
    },
    AMP10: {
        type: Boolean,
    },
    wifi: {
        type: Boolean,
    },
    water: {
        type: Boolean
    },
    sewage: {
        type: Boolean
    },
    cable: {
        type: Boolean
    },
    priceperday: {
        type: Number
    },
    seasonprice: {
        type: Number
    }
});

const Field = mongoose.model('field', FieldSchema);

module.exports = Field;