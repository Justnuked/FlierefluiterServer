const Spot = require('../models/spotModel');

module.exports = {

    create(req, res, next) {

        let spot = new Spot({
            name: req.body.name,
            available: req.body.available
        });

        spot.save()
            .then((result) => {
                res.status(200).send({
                    Message: "spot created!",
                    Spot: result
                });
            }).catch(next);
    },

        get(req, res, next) {

            Spot.find({}, function(err, data) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    res.status(200).send(data);
                }
            }).catch(next);
        },

        getById(req, res, next) {

            Spot.findById({ _id: req.params.id }, function(err, data) {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    if (data === null) {
                        res.status(400).send({ Error: 'spot not found.' });
                    } else {
                        res.status(200).send(data);
                    }
                }
            }).catch(next);
        },

        delete(req, res, next) {

            Spot.findById({ _id: req.params.id })
                .then((spot) => {
                    if (spot === null) {
                        res.status(400).send({ Error: 'spot does not exist.' });
                    } else {
                        spot.delete()
                            .then(() => {
                                res.status(200).send({ Message :'spot has been removed successfully.' });
                            }).catch(next);
                        
                    }
                }).catch(next);
        },
        
        update(req, res, next) {

        Spot.findByIdAndUpdate(
            { _id: req.params.id }, 
            {
                name: req.body.name,
                available: req.body.available
            },
            {
                new: true
            })
            .then((spot) => {
                // Check if spot exists
                if (spot === null) {
                    res.status(400).send({ Error: 'Spot does not exist.' });
                }
                // Confirm and return data
                else {
                    res.status(200).send({ 
                        Message: 'Spot edited successfully.',
                        Spot: spot 
                    });
                }
            }).catch(next);
    },
};