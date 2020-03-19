const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacilitiesrentedSchema = new Schema({
    facility: {
        type: Schema.Types.ObjectId,
        ref: 'facility'
    },
    startdate: {
        type: Date
    },
    enddate: {
        type: Date,
    },
    totalprice: {
        type: Number,
    },
});

const Facilitiesrented = mongoose.model('facilitiesrented', FacilitiesrentedSchema);

module.exports = Facilitiesrented;