const express = require('express');
const routes = express.Router();

//define controllers here
const Customer = require('../controllers/customerController.js');
const Guest = require('../controllers/guestController.js');
const Field = require('../controllers/fieldController.js');
const Reservation = require('../controllers/reservationController.js');
// const Facility = require('../controllers/facilityController.js');
// const SeasonPrice = require('../controllers/seasonpriceController.js');
const Bill = require('../controllers/billController.js');
// const FacilitiesRented = require('../controllers/facilitiesrentedController.js');

//Customer routes
routes.get('/customer', Customer.get);
routes.get('/customer/:id', Customer.getById);
routes.post('/customer', Customer.create);
routes.put('/customer/:id', Customer.update);
routes.delete('/customer/:id', Customer.delete);

//Guest routes
routes.get('/guest', Guest.get);
routes.get('/guest/:id', Guest.getById);
routes.post('/guest', Guest.create);
routes.put('/guest/:id', Guest.update);
routes.delete('/guest/:id', Guest.delete);

//Field routes
routes.get('/field', Field.get);
routes.get('/field/:name', Field.getById);
routes.post('/field', Field.create);
routes.put('/field/:name', Field.update);
routes.delete('/field/:name', Field.delete);

// //Reservation routes
routes.get('/reservation', Reservation.get);
routes.get('/reservation/:id', Reservation.getById);
routes.post('/reservation', Reservation.create);
routes.put('/reservation/:id', Reservation.update);
routes.delete('/reservation/:id', Reservation.delete);

// //Facility routes
// routes.get('/facility', Facility.get);
// routes.get('/facility/:id', Facility.getById);
// routes.post('/facility', Facility.create);
// routes.put('/facility/:id', Facility.update);
// routes.delete('/facility/:id', Facility.delete);

// //SeasonPrice routes
// routes.get('/seasonprice', SeasonPrice.get);
// routes.get('/seasonprice/:id', SeasonPrice.getById);
// routes.post('/seasonprice', SeasonPrice.create);
// routes.put('/seasonprice/:id', SeasonPrice.update);
// routes.delete('/seasonprice/:id', SeasonPrice.delete);

//Bill routes
routes.get('/bill', Bill.get);
routes.get('/bill/:id', Bill.getById);
routes.post('/bill', Bill.create);
routes.put('/bill/:id', Bill.update);
routes.delete('/bill/:id', Bill.delete);

// //FacilitiesRented routes
// routes.get('/facilitiesrented', FacilitiesRented.get);
// routes.get('/facilitiesrented/:id', FacilitiesRented.getById);
// routes.post('/facilitiesrented', FacilitiesRented.create);
// routes.put('/facilitiesrented/:id', FacilitiesRented.update);
//routes.delete('/facilitiesrented/:id', FacilitiesRented.delete);

module.exports = routes;