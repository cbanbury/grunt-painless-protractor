'use strict';

var sinonChai = require('sinon-chai');
var chai = require('chai');
chai.should();
chai.use(sinonChai);

global.sinon = require('sinon');
global.proxyquire = require('proxyquire');
global.expect = chai.expect;
