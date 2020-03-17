const Guest = require("../models/guestModel");

module.exports = {

    //Create a new guest
    create(req, res, next) {

        //TODO: Decide where to check for data duplication. Front end?
        let guest = new Guest({
            name: req.body.name,
            period: req.body.period,
            dateofbirth: req.body.dateofbirth,
            address: req.body.address,
            zipcode: req.body.zipcode,
            city: req.body.city,
            country: req.body.country
        });

        guest.save()
            .then((result) => {
                res.status(200).send({
                    Message: "Guest created succesfully.",
                    Guest: result
                });
            }).catch(next);
    },

    //Get all guests
    get(req, res, next) {

        Guest.find({}, function(err, data) {
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

    //Get specific guest
    getById(req, res, next) {

        Guest.findById({ _id: req.params.id }, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Return fetched data
            else {
                if (data === null) {
                    res.status(400).send({ Error: 'Guest not found.' });
                } else {
                    res.status(200).send(data);
                }
            }
        }).catch(next);
    },

    //Update existing guest
    update(req, res, next) {

        Guest.findByIdAndUpdate(
            { _id: req.params.id },
            {
                name: req.body.name,
                period: req.body.period,
                dateofbirth: req.body.dateofbirth,
                address: req.body.address,
                zipcode: req.body.zipcode,
                city: req.body.city,
                country: req.body.country
            },
            {
                new: true
            })
            .then((guest) => {
                //Check if retrieved guest exists
                if (guest === null) {
                    res.status(400).send({ Error: 'Guest not found.' });
                } else {
                    res.status(200).send({ 
                        Message: 'Guest edited succesfully.',
                        Guest: guest
                    });
                }
            }).catch(next);
    },

    //Delete guest
    delete(req, res, next) {

        Guest.findById({ _id: req.params.id })
            .then((guest) => {
                if (guest === null) {
                    res.status(400).send({ Error: 'Guest not found.' });
                } else {
                    guest.delete().then(() => {
                        res.status(200).send({ Message: 'Guest has been removed succesfully.' });
                    }).catch(next);
                }
            }).catch(next);
    }
};