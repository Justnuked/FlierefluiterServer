const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
var should = require('chai').should();

let customer = {
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

let customerId = '';

describe('Customer CRUD functions', () => {

    it('should not create a new customer without name', (done) => {
        customer.name = null;
        chai.request(server)
            .post('/api/customer')
            .set('content-type', 'application/json')
            .send(customer)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(404);
                res.should.be.an('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').that.has.property('message').eql('customer validation failed: name: Path `name` is required.');
                done();
            });
    });

    it('should successfully create a new customer', (done) => {
        customer.name = "testCustomer";
        chai.request(server)
            .post('/api/customer')
            .set('content-type', 'application/json')
            .send(customer)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.should.be.an('object');
                res.body.should.have.property('Message').eql('Customer created succesfully.');
                res.body.should.have.property('Customer');
                res.body.should.have.property('Customer').that.has.property('_id');
                res.body.should.have.property('Customer').that.has.property('name', customer.name);

                customerId = res.body.Customer._id;
                done();
            });
    });

    it('should edit a customer with a correct id given', (done) => {
        customer.name = "editedCustomer";
        chai.request(server)
            .put('/api/customer/' + customerId)
            .set('content-type', 'application/json')
            .send(customer)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('Message').eql('Customer edited successfully.');
                res.body.should.have.property('Customer').that.has.property('name', customer.name);
                done();
            });
    });

    it('should not try to edit a customer with an incorrect id', (done) => {
        chai.request(server)
            .put('/api/customer/000000000000000000000000')
            .set('content-type', 'application/json')
            .send(customer)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('Error').eql('Customer does not exist.');
                done();
            });
    });

    it('should not try to delete a customer with incorrect id', (done) => {
        chai.request(server)
            .delete('/api/customer/000000000000000000000000')
            .set('content-type', 'application/json')
            .send({})
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('Error').eql('Customer does not exist.');
                done();
            });
    });

    it('should delete a customer', (done) => {
        chai.request(server)
            .delete('/api/customer/' + customerId)
            .set('content-type', 'application/json')
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('Message').eql('Customer has been removed successfully.');
                done();
            });
    });
});