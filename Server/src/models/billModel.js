const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    reservation: {
        type: Schema.Types.ObjectId,
        ref: 'reservation'
    },
    price: {
        type: Number,
    },
    date: {
        type: Date
    },
});

const Bill = mongoose.model('bill', BillSchema);

module.exports = Bill;