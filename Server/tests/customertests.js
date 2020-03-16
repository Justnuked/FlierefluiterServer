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
    idcardorpassport: 0
};

describe('Customer CRUD functions', () => {
    it('should not create a new customer without name', () => {
        chai.request(server)
            .post('/api/customer')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({})
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(404);
                res.should.be.an('object');
                res.should.have.property('error');
                res.should.have.property('error').that.has.property('message').eql('customer validation failed: name: Path `name` is required.');
            });
    });

    it('should succesfully create a new customer');

    it('should not create a customer with idnumber that already exists in the database');

    it('should edit a customer with a correct id given');

    it('should not try to edit a customer with an incorrect id');

    it('should not try to delete a customer with incorrect id');

    it('should delete a customer');
});