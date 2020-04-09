const express = require('express');
const routes = express.Router();
const passport = require('passport');
const utils = require('../config/utils');
const ROLES = require('../config/roles').ROLES;

//define controllers here
const Customer = require('../controllers/customerController.js');
const Guest = require('../controllers/guestController.js');
const Field = require('../controllers/fieldController.js');
const Reservation = require('../controllers/reservationController.js');
const Facility = require('../controllers/facilityController.js');
const SeasonPrice = require('../controllers/seasonpriceController.js');
const Bill = require('../controllers/billController.js');
const FacilitiesRented = require('../controllers/facilitiesrentedController.js');
const User = require('../controllers/usercontroller');
const Spot = require ('../controllers/spotController.js')


//Customer routes
routes.get('/customer', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.Reception, ROLES.GroundsKeeper))
    {
        return Customer.get(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

routes.get('/customer/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.Reception, ROLES.GroundsKeeper))
    {
        return Customer.getById(req, res, next);
    }
    else 
    {
        return res.json({ Message: "You dont have the required role to access this resource" });
    }
});

routes.post('/customer', Customer.create);

routes.put('/customer/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.Reception, ROLES.GroundsKeeper))
    {
        return Customer.update(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

routes.delete('/customer/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.Reception, ROLES.GroundsKeeper))
    {
        return Customer.delete(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

//Guest routes
routes.get('/guest', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Guest.get(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

routes.get('/guest/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Guest.getById(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.post('/guest', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Guest.create(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

routes.put('/guest/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Guest.update(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});


routes.delete('/guest/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Guest.delete(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

//Field routes
routes.get('/field', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Field.get(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

routes.get('/field/:name', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Field.getById(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.post('/field', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Field.create(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

routes.put('/field/:name', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Field.update(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.delete('/field/:name', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Field.delete(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

//Reservation routes
routes.get('/reservation', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Reservation.get(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.get('/reservation/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Reservation.getById(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

routes.post('/reservation', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Reservation.create(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.put('/reservation/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Reservation.update(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.delete('/reservation/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Reservation.delete(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});


//Facility routes
routes.get('/facility', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Facility.get(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.get('/facility/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Facility.getById(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.post('/facility', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Facility.create(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.put('/facility/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Facility.update(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.delete('/facility/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Facility.delete(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

//user routes
routes.delete('/user/:name', User.deleteUser);
routes.post('/login', User.login);
routes.post('/register', User.createCustomer);



//SeasonPrice routes
routes.get('/seasonprice', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return SeasonPrice.get(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.get('/seasonprice/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Customer, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return SeasonPrice.getById(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.post('/seasonprice', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return SeasonPrice.update(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.put('/seasonprice/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return SeasonPrice.update(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.delete('/seasonprice/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return SeasonPrice.delete(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

//Bill routes
routes.get('/bill', Bill.get);
routes.get('/bill/:id', Bill.getById);
routes.post('/bill', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Bill.create(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.put('/bill/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Bill.update(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.delete('/bill/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return Bill.delete(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

//Spot Routes
routes.get('/spot', Spot.get);
routes.get('/spot/:id', Spot.getById);
routes.post('/spot', Spot.create);
routes.put('/spot/:id', Spot.update);
routes.delete('/spot/:id', Spot.delete);

//FacilitiesRented routes
routes.get('/facilitiesrented', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Customer, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return FacilitiesRented.get(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.get('/facilitiesrented/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Customer, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return FacilitiesRented.getById(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.post('/facilitiesrented', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Customer, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return FacilitiesRented.create(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.put('/facilitiesrented/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Customer, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return FacilitiesRented.update(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});
routes.delete('/facilitiesrented/:id', passport.authenticate('jwt', { session: false }), function (req, res, next) {

    //check if the user is in role. . .
    if (utils.checkIsInRole(req.user, ROLES.Manager, ROLES.Reception, ROLES.Customer, ROLES.Admin, ROLES.GroundsKeeper))
    {
        return FacilitiesRented.delete(req, res, next);
    }
    else
    {
        return res.json({ Message: "You dont have the required role to access this resource" });

    }
});

module.exports = routes;