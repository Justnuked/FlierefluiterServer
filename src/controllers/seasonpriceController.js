const utils = require('../config/utils');
const SeasonPrice = require('../models/seasonPriceModel');

module.exports = {

    //Create a new SeasonPrice
    create(req, res, next) {

        let seasonPrice = new SeasonPrice({
            season: req.body.season,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            price: req.body.price
        });

        seasonPrice.save().then((result) => {
            res.status(200).send({
                Message: 'SeasonPrice successfully created',
                SeasonPrice: result
            });
        }).catch(next);
    },

    get(req, res, next) {

        SeasonPrice.find({}, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Return fetched data
            else {
                if (data !== null) {
                    //Hateoas
                    var dataArray = [];

                    data.forEach(seasonPrice => {
                        seasonPriceJson = seasonPrice.toJSON();
                        seasonPriceJson['links'] = [
                            {
                                rel: 'self',
                                href: `${utils.url}/seasonprice/` + seasonPrice._id
                            }
                        ];
                        dataArray.push(seasonPriceJson);
                    });
                }

                res.status(200).send({ data: dataArray });
            }
        }).catch(next);
    },

    getById(req, res, next) {

        SeasonPrice.findById(req.params.id, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Return fetched data
            else {
                if (data === null) {
                    res.status(400).send({ Error: 'SeasonPrice not found.'});
                } else {
                    //Hateoas
                    dataJson = data.toJSON();
                    var links = [
                        {
                            rel: 'self',
                            href: `${utils.url}/seasonprice/${data._id}`
                        }
                    ];
                    dataJson['links'] = links;
                    
                    res.status(200).send({ data: dataJson });
                }
            }
        }).catch(next);
    },

    update(req, res, next) {

        SeasonPrice.findByIdAndUpdate(
            req.params.id,
            {
                season: req.body.season,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                price: req.body.price
            },
            { new: true}
        ).then((seasonPrice) => {
            if (seasonPrice === null) {
                res.status(400).send({ Error: 'SeasonPrice not found.'});
            } else {
                res.status(200).send({
                    Message: 'SeasonPrice edited successfully.',
                    SeasonPrice: seasonPrice
                });
            }
        }).catch(next);
    },

    delete(req, res, next) {

        SeasonPrice.findById(req.params.id).then((seasonPrice) => {
            if (seasonPrice === null) {
                res.status(400).send({ Error: 'SeasonPrice not found.'});
            } else {
                seasonPrice.delete().then(() => {
                    res.status(200).send({ Message :'SeasonPrice has been removed successfully.' });
                }).catch(next);
            }
        }).catch(next);
    }
}