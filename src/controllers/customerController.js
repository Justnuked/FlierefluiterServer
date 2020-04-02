const utils = require('../config/utils');
const Customer = require('../models/customerModel');

module.exports = {

    //Create a new customer
    create(req, res, next) {

        Customer.findOne({idnumber: req.body.idnumber}, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Customer doesn't exist yet.
            if (data === null) {
                let customer = new Customer({
                    name: req.body.name,
                    address: req.body.address,
                    zipcode: req.body.zipcode,
                    city: req.body.city,
                    country: req.body.country,
                    phone: req.body.phone,
                    email: req.body.email,
                    dateofbirth: req.body.dateofbirth,
                    idnumber: req.body.idnumber,
                    idcardorpassport: req.body.idcardorpassport
                });
                customer.save()
                    .then((result) => {
                        res.status(200).send({
                            Message: "Customer created succesfully.",
                            Customer: result
                        });
                    }).catch(next);
            } else {
                res.status(400).send({ Error: 'Customer already exists.' });
            }
        }).catch(next);
    },

    //Get all customers
    get(req, res, next) {

        Customer.find({}, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Check fetched data
            else {
                //Hateoas
                if (data !== null) {
                    var dataArray = [];

                    data.forEach(customer => {
                        customerData = customer.toJSON();
                        customerData['links'] = [
                            {
                                rel: 'self',
                                href: `${utils.url}/customer/` + customer._id
                            }
                        ];
                        dataArray.push(customerData);
                    });
                }
                //Return data
                res.status(200).send({ data: dataArray });
            }
        }).catch(next);
    },

    //Get customer by id
    getById(req, res, next) {
        
        Customer.findById({ _id: req.params.id }, function(err, data) {
            //If server error
            if (err) {
                res.status(500).send(err);
            }
            //Check fetched data
            else {
                if (data === null) {
                    res.status(400).send({ Error: "Customer not found." });
                } else {
                    //Hateoas
                    var links = [
                        {
                            rel: 'self',
                            href: `${utils.url}/customer/` + data._id
                        }
                    ];
                    dataJson = data.toJSON();
                    dataJson['links'] = links;

                    //Return data
                    res.status(200).send({ data: dataJson });
                }
            }
        }).catch(next);
    },

    //Update existing customer
    update(req, res, next) {

        Customer.findByIdAndUpdate(
            { _id: req.params.id }, 
            {
                name: req.body.name,
                address: req.body.address,
                zipcode: req.body.zipcode,
                city: req.body.city,
                country: req.body.country,
                phone: req.body.phone,
                email: req.body.email,
                dateofbirth: req.body.dateofbirth,
                idnumber: req.body.idnumber,
                idcardorpassport: req.body.idcardorpassport
            },
            {
                new: true
            })
            .then((customer) => {
                //Check if retrieved customer exists.
                if (customer === null) {
                    res.status(400).send({ Error: 'Customer does not exist.' });
                }
                //Else confirm update and show new data
                else {
                    res.status(200).send({ 
                        Message: 'Customer edited successfully.',
                        Customer: customer 
                    });
                }
            }).catch(next);
    },

    //Delete Customer
    delete(req, res, next) {

        Customer.findById({ _id: req.params.id })
            .then((customer) => {
                if (customer === null) {
                    res.status(400).send({ Error: 'Customer does not exist.' });
                } else {
                    customer.delete()
                        .then(() => {
                            res.status(200).send({ Message :'Customer has been removed successfully.' });
                        }).catch(next);
                    
                }
            }).catch(next);
    }
};