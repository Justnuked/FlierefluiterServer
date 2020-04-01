const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);
var should = require('chai').should();

let guest = {
    name: 'testGuest',
    period: '01-01-2010',
    dateofbirth: '01-01-1980',
    address: 'GuestStreet 1',
    zipcode: '9876 BB',
    city: 'Amsterdam',
    country: 'Netherlands'
};

let guestId = '';

describe('Guest CRUD functions', () => {
    it('should not create a guest without giving a name', (done) => {
        guest.name = null;
        chai.request(server)
            .post('/api/guest')
            .set('content-type', 'application/json')
            .send(guest)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(404);
                res.should.be.an('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').that.has.property('message').eql('guest validation failed: name: Path `name` is required.');
                done();
            });
    });

    it('should successfully create a guest', (done) => {
        guest.name = 'testGuest';
        chai.request(server)
            .post('/api/guest')
            .set('content-type', 'application/json')
            .send(guest)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.should.be.an('object');
                res.body.should.have.property('Message').eql('Guest created succesfully.');
                res.body.should.have.property('Guest');
                res.body.should.have.property('Guest').that.has.property('_id');
                res.body.should.have.property('Guest').that.has.property('name', guest.name);

                guestId = res.body.Guest._id;
                done();
            });
    });

    it('should not try to edit a guest with incorrect id', (done) => {
        chai.request(server)
            .put('/api/guest/000000000000000000000000')
            .set('content-type', 'application/json')
            .send(guest)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('Error').eql('Guest not found.');
                done();
            });
    });

    it('should edit a guest', (done) => {
        guest.name = 'editedGuest';
        chai.request(server)
            .put('/api/guest/' + guestId)
            .set('content-type', 'application/json')
            .send(guest)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('Message').eql('Guest edited succesfully.');
                res.body.should.have.property('Guest').that.has.property('name', guest.name);
                done();
            });
    });

    it('should not try to delete a guest with incorrect id', (done) => {
        chai.request(server)
            .delete('/api/guest/000000000000000000000000')
            .set('content-type', 'application/json')
            .send(guest)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('Error').eql('Guest not found.');
                done();
            });
    });

    it('should delete a guest', (done) => {
        chai.request(server)
            .delete('/api/guest/' + guestId)
            .set('content-type', 'application/json')
            .send(guest)
            .end((err, res) => {
                should.exist(res.body);
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('Message').eql('Guest has been removed succesfully.');
                done();
            });
    });
});