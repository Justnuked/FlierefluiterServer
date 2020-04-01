const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
var should = require('chai').should();

const Customer = require('../src/models/customerModel');

require('./customertests');
require('./guesttests');

let customer = {
    _id: '',
    name: 'testCustomer',
    address: 'testStreet 1',
    zipcode: '1234 AA',
    city: 'London',
    country: 'England',
    phone: '0612345678',
    email: 'testCustomer1@yahoo.net',
    dateofbirth: '02-14-1980',
    idnumber: '012345678',
    idcardorpassport: 'Passport'
};

let guest = {
    _id: '',
    name: 'testGuest',
    period: '01-01-2010',
    dateofbirth: '01-01-1980',
    address: 'GuestStreet 1',
    zipcode: '9876 BB',
    city: 'Amsterdam',
    country: 'Netherlands'
};

let reservation = {
    _id: 0,
    customer: '',
    guests: [],
    startdate: new Date('2020-04-01'),
    enddate: new Date('2020-04-14'),
    facilitiesrented: [],
    areas: ['K1', 'K2'],
    state: 'Placed',
    discount: false
};

describe('Reservation CRUD fuctions', () => {

    before((done) => {
        chai.request(server)
            .post('/api/customer')
            .set('content-type', 'application/json')
            .send(customer)
            .end((err, res) => {
                customer._id = res.body.Customer._id; 
                reservation.customer = customer._id;

                chai.request(server)
                    .post('/api/guest')
                    .set('content-type', 'application/json')
                    .send(guest)
                    .end((err, res) => {
                        guest._id = res.body.Guest._id;
                        reservation.guests.push(guest._id);

                        done();
                    });
            });
    });

    after((done) => {
        chai.request(server)
            .delete('/api/customer/' + customer._id)
            .set('content-type', 'application/json')
            .end(() => {

                chai.request(server)
                    .delete('/api/guest/' + guest._id)
                    .set('content-type', 'application/json')
                    .end(() => done());
            });
    });

    it('should not create a reservation without a start date', (done) => {
        reservation.startdate = undefined;
        chai.request(server)
        .post('/api/reservation')
        .set('content-type', 'application/json')
        .send(reservation)
        .end((err, res) => {
            should.exist(res.body);
            should.not.exist(err);
            res.should.have.status(404);
            res.should.be.an('object');
            res.body.should.have.property('error');
            res.body.should.have.property('error').that.has.property('message').eql('reservation validation failed: startdate: Path `startdate` is required.');
            
            done();
        });
    });

    it('should create a reservation when all necessary data is given', (done) => {
        reservation.startdate = new Date('2020-04-01');
        chai.request(server)
        .post('/api/reservation')
        .set('content-type', 'application/json')
        .send(reservation)
        .end((err, res) => {

            should.exist(res.body);
            should.not.exist(err);
            res.should.have.status(200);
            res.should.be.an('object');
            res.body.should.have.property('Message').eql('Reservation created successfully.');
            res.body.should.have.property('Reservation');
            res.body.should.have.property('Reservation').that.has.property('_id');
            res.body.should.have.property('Reservation').that.has.property('startdate', reservation.startdate.toISOString());
            res.body.should.have.property('Reservation').that.has.property('enddate', reservation.enddate.toISOString());
            res.body.should.have.property('Reservation').that.has.property('customer', reservation.customer);
            
            reservation._id = res.body.Reservation._id;                
            done();
        });
    });

    it('should not try to edit a reservation with a wrong id', (done) => {
        chai.request(server)
            .put('/api/reservation/000000000000000000000000')
            .set('content-type', 'application/json')
            .send(reservation)
            .end((err, res) => {
                should.exist(res.body);
                should.not.exist(err);
                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('Error').eql('Reservation not found.');

                done();
            });
    });

    it('should edit a reservation with the new given values', (done) => {
        reservation.state = 'Confirmed';
        chai.request(server)
            .put('/api/reservation/' + reservation._id)
            .set('content-type', 'application/json')
            .send(reservation)
            .end((err, res) => {
                should.exist(res.body);
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('Message').eql('Reservation edited successfully.');
                res.body.should.have.property('Reservation').that.has.property('state', reservation.state);

                done();
            });
    });

    it('should not try to delete a reservation with a wrong id', (done) => {
        chai.request(server)
            .delete('/api/reservation/000000000000000000000000')
            .set('content-type', 'application/json')
            .end((err, res) => {
                should.exist(res.body);
                should.not.exist(err);
                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('Error').eql('Reservation not found.');

                done();
            })
    });

    it('should delete a reservation', (done) => {
        chai.request(server)
            .delete('/api/reservation/' + reservation._id)
            .set('content-type', 'application/json')
            .end((err, res) => {
                should.exist(res.body);
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('Message').eql('Reservation has been removed successfully.');

                done();
        });
    });
});