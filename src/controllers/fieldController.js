const utils = require('../config/utils');
const Field = require('../models/fieldModel');

module.exports = {

    //Create a new field
    create(req, res, next) {

        Field.findOne({ name: req.body.name }, function (err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Customer doesn't exist yet.
            if (data === null) {
                let field = new Field({
                    name: req.body.name,
                    type: req.body.type,
                    area: req.body.area,
                    squaremeters: req.body.squaremeters,
                    AMP6: req.body.AMP6,
                    AMP10: req.body.AMP10,
                    wifi: req.body.wifi,
                    water: req.body.water,
                    sewage: req.body.sewage,
                    cable: req.body.cable,
                    priceperday: req.body.priceperday,
                    seasonprice: req.body.seasonprice
                });
                field.save()
                    .then((result) => {
                        res.status(200).send({
                            Message: "Field created succesfully.",
                            Field: field
                        });
                    }).catch(next);
            } else {
                res.status(400).send({ Error: 'Field already exists.' });
            }
        }).catch(next);
    },

    //Get all fields
    get(req, res, next) {

        Field.find({}, function (err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Return fetched data
            else {
                if (data !== null) {
                    //Hateoas
                    var dataArray = [];

                    data.forEach(field => {
                        fieldJson = field.toJSON();
                        fieldJson['links'] = [
                            {
                                rel: 'self',
                                href: `${utils.url}/field/` + field.name
                            }
                        ];
                        dataArray.push(fieldJson);
                    });
                }

                res.status(200).send({ data: dataArray });
            }
        }).catch(next);
    },

    //Get field by name
    getById(req, res, next) {
        Field.findOne({ name: req.params.name }, function (err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Return fetched data
            else {
                if (data === null) {
                    res.status(400).send({ Error: 'Field not found.' });
                } else {

                    //Hateoas
                    dataJson = data.toJSON();
                    var links = [
                        {
                            rel: 'self',
                            href: `${utils.url}/field/${data.name}`
                        }
                    ];
                    dataJson['links'] = links;
                    
                    res.status(200).send({ data: dataJson });
                }
            }
        }).catch(next);
    },

    //Update existing field
    update(req, res, next) {

        Field.findOneAndUpdate({ name: req.params.name },
            {
                name: req.body.name,
                type: req.body.type,
                area: req.body.area,
                squaremeters: req.body.squaremeters,
                AMP6: req.body.AMP6,
                AMP10: req.body.AMP10,
                wifi: req.body.wifi,
                water: req.body.water,
                sewage: req.body.sewage,
                cable: req.body.cable,
                priceperday: req.body.priceperday,
                seasonprice: req.body.seasonprice
            },
            {
                new: true
            })
            .then((field) => {
                //Check if retrieved field exists.
                if (field === null) {
                    res.status(400).send({ Error: 'Field does not exist.' });
                }
                //Else confirm update and show new data
                else {
                    res.status(200).send({
                        Message: 'Field edited successfully.',
                        Field: field
                    });
                }
            }).catch(next);
    },

    //Delete field
    delete(req, res, next) {

        Field.findOne({ name: req.params.name })
            .then((field) => {
                if (field === null) {
                    res.status(400).send({ Error: 'Field does not exist.' });
                } else {
                    field.delete()
                        .then(() => {
                            res.status(200).send({ Message: 'Field has been removed successfully.' });
                        }).catch(next);

                }
            }).catch(next);
    }
};