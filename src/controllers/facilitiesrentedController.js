const FacilitiesRented = require('../models/facilitiesRentedModel');

module.exports = {

    //Create a new FacilitiesRented
    create(req, res, next) {

        let facilitiesRented = new FacilitiesRented({
            facility: req.body.faciliyid,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            totalprice: req.body.totalprice
        });
        facilitiesRented.save().then((result) => {
            res.status(200).send({ 
                Message: 'FacilitiesRented created succesfully.',
                FacilitiesRented: result
            });
        }).catch(next);
    },

    get(req, res, next) {

        FacilitiesRented.find({}, function(err, data) {
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

    getById(req, res, next) {

        FacilitiesRented.findById({ _id: req.params.id }, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            } else {
                if (data === null) {
                    res.status(400).send({ Error: 'FacilitiesRented not found.' });
                } else {
                    res.status(200).send(data);
                }
            }
        }).catch(next);
    },

    update(req, res, next) {

        FacilitiesRented.findByIdAndUpdate(
            { _id: req.params.id },
            {
                facility: req.body.faciliyid,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                totalprice: req.body.totalprice
            },
            { new: true }
            ).then((facilitiesRented) => {
                if (facilitiesRented === null) {
                    res.status(400).send({ Error: 'FacilitiesRented not found.' });
                } else {
                    res.status(200).send({
                        Message: 'FacilitiesRented edited successfully.',
                        FacilitiesRented: facilitiesRented
                    });
                }
            }).catch(next);
    },

    delete(req, res, next) {

        FacilitiesRented.findById({ _id: req.params.id }).then((facilitiesRented) => {
            if (facilitiesRented === null) {
                res.status(400).send({ Error: 'FacilitiesRented not found.' });
            } else {
                facilitiesRented.delete().then(() => {
                    res.status(200).send({ Message :'FacilitiesRented has been removed successfully.' });
                }).catch(next);
            }
        }).catch(next);
    }
};