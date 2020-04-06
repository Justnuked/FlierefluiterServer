const utils = require('../config/utils');
const FacilitiesRented = require('../models/facilitiesRentedModel');

module.exports = {

    //Create a new FacilitiesRented
    create(req, res, next) {

        let facilitiesRented = new FacilitiesRented({
            facility: req.body.facility,
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
            //Check fetched data
            else {
                if (data !== null) {
                    //Hateoas
                    var dataArray = [];

                    data.forEach(facilitiesRented => {
                        rentedJson = facilitiesRented.toJSON();
                        rentedJson['links'] = [
                            {
                                rel: 'self',
                                href: `${utils.url}/facilitiesrented/` + facilitiesRented._id
                            },
                            {
                                rel: 'facility',
                                href: `${utils.url}/facility/` + facilitiesRented.facility
                            }
                        ];
                        dataArray.push(rentedJson);
                    });
                }
                res.status(200).send({ data: dataArray });
            }
        }).catch(next);
    },

    getById(req, res, next) {

        FacilitiesRented.findById({ _id: req.params.id }, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            } else {
                //Check fetched data
                if (data === null) {
                    res.status(400).send({ Error: 'FacilitiesRented not found.' });
                } else {
                    //Hateoas
                    dataJson = data.toJSON();
                    var links = [
                        {
                            rel: 'self',
                            href: `${utils.url}/facilitiesrented/` + data._id
                        }, 
                        {
                            rel: 'facility',
                            href: `${utils.url}/facility/` + data.facility
                        }
                    ];
                    dataJson['links'] = links

                    //Return data
                    res.status(200).send({ data: dataJson });
                }
            }
        }).catch(next);
    },

    update(req, res, next) {

        FacilitiesRented.findByIdAndUpdate(
            { _id: req.params.id },
            {
                facility: req.body.facility,
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