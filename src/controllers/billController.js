const utils = require('../config/utils');
const Bill = require('../models/billModel');

module.exports = {

    create(req, res, next) {

        // Check later to see if the reservation actually exists? 
        let bill = new Bill({
            price: req.body.price,
            date: req.body.date,
            reservation: req.body.reservationID
        });

        bill.save()
            .then((result) => {
                res.status(200).send({
                    Message: "Bill created!",
                    Guest: result
                });
            }).catch(next);
    },

    //Get all bills
    get(req, res, next) {

        Bill.find({}, function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                if (data !== null) {
                    //Hateoas
                    var dataArray = [];

                    data.forEach(bill => {
                        billJson = bill.toJSON();
                        billJson['links'] = [
                            {
                                rel: 'self',
                                href: `${utils.url}/bill/` + bill._id
                            },
                            {
                                rel: 'facility',
                                href: `${utils.url}/reservation/` + bill.reservation
                            }
                        ];
                        dataArray.push(billJson);
                    });
                }

                res.status(200).send({ data: dataArray });
            }
        }).catch(next);
    },

    getById(req, res, next) {

        Bill.findById({ _id: req.params.id }, function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                if (data === null) {
                    res.status(400).send({ Error: 'Bill not found.' });
                } else {
                    //Hateoas
                    dataJson = data.toJSON();
                    var links = [
                        {
                            rel: 'self',
                            href: `${utils.url}/bill/${data._id}`
                        },
                        {
                            rel: 'reservation',
                            href: `${utils.url}/bill/${data.reservation}`
                        }
                    ];
                    dataJson['links'] = links;

                    res.status(200).send({ data: dataJson });
                }
            }
        }).catch(next);
    },

    delete(req, res, next) {

        Bill.findById({ _id: req.params.id })
            .then((bill) => {
                if (bill === null) {
                    res.status(400).send({ Error: 'Bill does not exist.' });
                } else {
                    bill.delete()
                        .then(() => {
                            res.status(200).send({ Message :'Bill has been removed successfully.' });
                        }).catch(next);
                    
                }
            }).catch(next);
    },

    // Updates a bill
    update(req, res, next) {

        Bill.findByIdAndUpdate(
            { _id: req.params.id }, 
            {
                price: req.body.price,
                date: req.body.date,
                reservation: req.body.reservationID
            },
            {
                new: true
            })
            .then((bill) => {
                // Check if bill exists
                if (bill === null) {
                    res.status(400).send({ Error: 'Bill does not exist.' });
                }
                // Confirm and return data
                else {
                    res.status(200).send({ 
                        Message: 'Bill edited successfully.',
                        Bill: bill 
                    });
                }
            }).catch(next);
    },
};