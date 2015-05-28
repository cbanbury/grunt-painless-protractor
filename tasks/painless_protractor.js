/*
* grunt-painless-protractor
*
*
* Copyright (c) 2015 Carl Banbury
* Licensed under the MIT license.
*/

'use strict';
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;

var webdriver;
var protractor;
var testServer;
var pid;

function tidyShutdown(grunt, error) {
    if (pid) {
        process.kill(pid);
    }

    if (webdriver) {
        process.kill(webdriver.pid);
    }

    if (testServer.pid) {
        process.kill(testServer.pid);
    }

    if (error) {
        return grunt.fail.warn(error);
    }
}

module.exports = function(grunt) {
    console.log(grunt);
    grunt.registerMultiTask('painless_protractor', 'Start selenium webdriver, local server and run protractor tests', function() {
        console.log('in here ' + this);
        var done = this.async();
        var options = this.options({});

        var webdriverBin = options.webdriver_bin || 'node_modules/protractor/bin/webdriver-manager';
        var protractorBin = options.protractor_bin || 'node_modules/protractor/bin/protractor';
        var configFile = options.config_file || 'conf.js';

        console.log('am getting here');
        var update = spawnSync(webdriverBin, ['update'], {stdio: 'inherit'});
        if (update.stderr) {
            return tidyShutdown(grunt, update.stderr);
        }

        webdriver = spawn(webdriverBin, ['start']);

        webdriver.stderr.on('data', function(data) {
            if (data.toString().search('WARN') > -1) {
                return tidyShutdown(grunt, data.toString());
            }

            if (data.toString().search('ERROR') > -1) {
                return tidyShutdown(grunt, data.toString());
            }

            // run protactor once the webdriver is running
            if (data.toString().search('INFO - Started SocketListener') > -1) {
                if (options.test_server && options.test_server.cmd) {
                    // spin up our test server
                    testServer = spawn(options.test_server.cmd,
                        options.test_server.args || [], {stdio: 'inherit'});

                    testServer.on('close', function(code) {
                        tidyShutdown(grunt, code !==0 ? code : null);
                        return done(code);
                    });
                }

                protractor = spawn(protractorBin, [configFile], {stdio: 'inherit'});

                protractor.on('close', function(code) {
                    tidyShutdown(grunt, code !==0 ? code : null);
                    return done(code);
                });
            }
        });

        webdriver.stdout.on('data', function(data) {

            // grab the pid from log so we can cleanly exit
            if (data.toString().search('seleniumProcess.pid') > -1) {
                pid = +data.toString().split(': ').pop();
            }
        });
    });
};
