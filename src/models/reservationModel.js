const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    areas: [{
        type: String
    }],
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    guests: [{
        type: Schema.Types.ObjectId,
        ref: 'guest'
    }],
    facilitiesrented: [{
        type: Schema.Types.ObjectId,
        ref: 'facilitiesrented'
    }],
    state: {
        type: String,
    },
    discount: {
        type: Boolean,
    },
});

const Reservation = mongoose.model('reservation', ReservationSchema);

module.exports = Reservation;