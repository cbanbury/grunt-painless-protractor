'use strict';

var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chai = require('chai');
chai.should();
chai.use(sinonChai);

module.exports = {
    proxyquire: require('proxyquire'),
    sinon: sinon,
    chai: chai
};
