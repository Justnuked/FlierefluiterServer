const Reservation = require('../models/reservationModel');
const Customer = require('../models/customerModel');
const Guest = require('../models/guestModel');

module.exports = {

    //Create a new reservation
    create(req, res, next) {
        
        //Don't delete yet please, other way of saving data
        //First get the customer for the reservation
        // var customer = new Customer();
        // Customer.findById({ _id: req.body.customerId }, function(err, data) {
        //     //If server error
        //     if (err) {
        //         res.status(500).send(err);
        //     }
        //     //Set customer variable
        //     else {
        //         if (data === null) {
        //             res.status(400).send({ Error: "Customer not found." });
        //         } else {
        //             customer = data
        //         }
        //     }
        // }).catch(next);
        
        //Then get all guests for the reservation
        // var guests = [];
        // req.body.guestIds.forEach(function(id) {
        //     Guest.findById({ _id: id }, function(err, data) {
        //         if (err) {
        //             res.status(500).send(err);
        //         } else {
        //             if (data === null) {
        //                 res.status(400).send({ Error: 'Guest not found' });
        //                 break;
        //             } else {
        //                 guests.push(data);
        //             }
        //         }
        //     }).catch(next);
        // });

        let reservation = new Reservation(
        {
            customer: req.body.customer,
            guests: req.body.guests,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            areas: req.body.areas,
            facilitiesrented: req.body.facilitiesrented,
            state: req.body.state,
            discount: req.body.discount
        });

        reservation.save().then((result) => {
            res.status(200).send({
                Message: "Reservation created successfully.",
                Reservation: result
            });
        }).catch(next);
    },

    //Get all reservations
    get(req, res, next) {
        Reservation.find({}, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Return fetched data
            else {
                res.status(200).send(data);
            }
        }).catch(next);
    },

    //Get specific reservation
    getById(req, res, next) {
        Reservation.findById({ _id: req.params.id }, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Return fetched data
            else {
                if (data === null) {
                    res.status(400).send({ Error: 'Reservation not found.' });
                } else {
                    res.status(200).send(data);
                }
            }
        }).catch(next);
    },

    //Update specific reservation
    update(req, res, next) {
        Reservation.findByIdAndUpdate(
            { _id: req.params.id },
            {
                customer: req.body.customer,
                guests: req.body.guests,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                areas: req.body.areas,
                facilitiesrented: req.body.facilitiesrented,
                state: req.body.state,
                discount: req.body.discount
            },
            {
                new: true
            })
            .then((reservation) => {
                //Check if retrieved guest exists
                if (reservation === null) {
                    res.status(400).send({ Error: 'Reservation not found.' });
                } else {
                    res.status(200).send({ 
                        Message: 'Reservation edited successfully.',
                        Reservation: reservation
                    });
                }
            }).catch(next);
    },

    //Delete reservation
    delete(req, res, next) {
        Reservation.findById({ _id: req.params.id})
            .then((reservation) => {
                if (reservation === null) {
                    res.status(400).send({ Error: 'Reservation not found.' });
                } else {
                    reservation.delete().then(() => {
                        res.status(200).send({ Message: 'Reservation has been removed successfully.' });
                    }).catch(next);
                }
            }).catch(next);
    }
};