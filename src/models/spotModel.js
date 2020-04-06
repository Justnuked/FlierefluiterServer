const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
    name: {
        type: String,
    },
    available:{
        type: Boolean
    }
});

const Spot = mongoose.model('spot', spotSchema);

module.exports = Spot;