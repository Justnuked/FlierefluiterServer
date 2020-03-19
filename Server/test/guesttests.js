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

describe('Guest CRUD functions', () => {
    it('should not create a guest without giving a name');

    //Other tests...
});