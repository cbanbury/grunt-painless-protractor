'use strict';

var my = require('./common');

describe('painless_protractor', function() {
    var painlessProtractor;
    var spawnStub;
    var spawnSyncStub;
    var gruntStub;
    var multiTaskStub;
    var testFunction;

    beforeEach(function() {
        spawnStub = my.sinon.stub();
        spawnSyncStub = my.sinon.stub();

        multiTaskStub = my.sinon.stub();

        multiTaskStub.yields(null);
        multiTaskStub.returnsThis();

        gruntStub = {
            registerMultiTask: multiTaskStub,
            options: 'woop'
        };

        painlessProtractor = my.proxyquire('../tasks/painless_protractor', {
            child_process: {
                spawn: spawnStub,
                spawnSync: spawnSyncStub
            }
        });
    });

    describe('update webdriver', function() {
        it.only('should synchronously update webdriver', function(done) {
            var testFunction = multiTaskStub.lastCall.args[2];
            testFunction();
        });

        it('should use webdriver binary provided by options if present', function() {

        });

        it('should default to local webdriver binary if not present in optons', function() {

        });

        it('process should inherit stdio', function() {

        });

        it('should perform update before starting the webdriver', function() {

        });

        it('should exit the task if update fails', function() {

        });
    });

    describe('start webdriver', function() {
        it('should use webdriver binary provided by options if present', function() {

        });

        it('should default to local webdriver binary if not present in optons', function() {

        });

        it('should have argument of `start`', function() {

        });

        it('should exit the task if a WARN message is logged', function() {

        });

        it('should exit the task if an ERROR message is logged', function() {

        });

        it('should capture the selenium process pid', function() {

        });
    });

    describe('start local server', function() {
        it('should be started after the webdriver has started', function() {

        });

        it('should run the command provided by options', function() {

        });

        it('should run the arguments provided by options', function() {

        });

        it('should not be called if command option not provided', function() {

        });

        it('should set default arguments if not provided by options', function() {

        });

        it('should pipe the server stdout', function() {

        });

        it('should exit the task if the server crashes', function() {

        });
    });

    describe('protractor tests', function() {
        it('should be started after the webdriver has started', function() {

        });

        it('should use protractor binary provided by options if present', function() {

        });

        it('should default to local protractor binary if not present in optons', function() {

        });

        it('should exit task with warning if tests failed once complete', function() {

        });

        it('should call done once complete if all tests pass', function() {

        });
    });
});
