const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeasonPriceSchema = new Schema({
    season: {
        type: String,
    },
    startdate: {
        type: Date,
    },
    enddate: {
        type: Date
    },
    price: {
        type: Number
    },
});

const SeasonPrice = mongoose.model('season_price', SeasonPriceSchema);

module.exports = SeasonPrice;