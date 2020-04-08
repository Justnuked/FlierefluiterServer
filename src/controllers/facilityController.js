const utils = require('../config/utils');
const Facility = require('../models/facilityModel');

module.exports = {

    //Create new facility
    create(req, res, next) {

        Facility.findOne({ name: req.body.name }, function (err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Facility doesn't exist yet
            if (data === null) {
                let facility = new Facility({
                    name: req.body.name,
                    description: req.body.description,
                    type: req.body.type,
                    price: req.body.price,
                    amountavailable: req.body.amountavailable,
                    amounttotal: req.body.amounttotal
                });
                facility.save().then((result) => {
                    res.status(200).send({
                        Message: 'Facility created succesfully.',
                        Facility: result
                    });
                }).catch(next);
            } else {
                res.status(400).send({ Error: 'Facility already exists.' });
            }
        }).catch(next);
    },

    //Get all facilities
    get(req, res, next) {

        Facility.find({}, function (err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            } else { //Return data
                if (data !== null) {
                    //Hateoas
                    var dataArray = [];

                    data.forEach(facility => {
                        facilityJson = facility.toJSON();
                        facilityJson['links'] = [
                            {
                                rel: 'self',
                                href: `${utils.url}/facility/` + facility._id
                            }
                        ];
                        dataArray.push(facilityJson);
                    });
                }
                res.status(200).send({ data: dataArray });
            }
        }).catch(next);
    },

    //Get specific facility
    getById(req, res, next) {

        Facility.findById({ _id: req.params.id }, function (err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            } else {
                if (data === null) {
                    res.status(400).send({ Error: 'Facility not found.' });
                } else {
                    //Hateoas
                    dataJson = data.toJSON();
                    var links = [
                        {
                            rel: 'self',
                            href: `${utils.url}/facility/` + data._id
                        }
                    ];
                    dataJson['links'] = links;

                    res.status(200).send({ data: dataJson });
                }
            }
        }).catch(next);
    },

    //Update a facility
    update(req, res, next) {
        Facility.findOneAndUpdate(
            { _id: req.params.id },
            {
                name: req.body.name,
                description: req.body.description,
                type: req.body.type,
                price: req.body.price,
                amountavailable: req.body.amountavailable,
                amounttotal: req.body.amounttotal
            },
            { new: true }
        ).then((facility) => {
            if (facility === null) {
                res.status(400).send({ Error: 'Facility not found.' });
            } else {
                res.status(200).send({
                    Message: 'Facility edited successfully.',
                    facility: facility
                });
            }
        }).catch(next);
    },

    //Delete a facility
    delete(req, res, next) {

        Facility.findById({ _id: req.params.id }).then((facility) => {
            if (facility === null) {
                res.status(400).send({ Error: 'Facility not found.' });
            } else {
                facility.delete().then(() => {
                    res.status(200).send({ Message: 'Facility has been removed successfully.' });
                }).catch(next);
            }
        }).catch(next);
    }
};