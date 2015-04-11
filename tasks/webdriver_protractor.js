/*
* grunt-simple-protractor
*
*
* Copyright (c) 2015 Carl Banbury
* Licensed under the MIT license.
*/

'use strict';
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;

module.exports = function(grunt) {
    grunt.registerMultiTask('simple_protractor', 'Start selenium webdriver, local server and run protractor tests', function() {
        var done = this.async();
        var options = this.options({});

        var webdriverBin = options.webdriver_bin || 'webdriver-manager';
        var protractorBin = options.protractor_bin || 'protractor';
        var configFile = options.config_file || 'conf.js';

        var update = spawnSync(webdriverBin, ['update'], {stdio: 'pipe'});
        var webdriver = spawn(webdriverBin, ['start']);
        var protractor;
        var pid;

        webdriver.stderr.on('data', function(data) {
            if (data.toString().search('WARN') > -1) {
                return grunt.fail.warn(data.toString());
            }

            if (data.toString().search('ERROR') > -1) {
                return grunt.fail.warn(data.toString());
            }

            // run protactor once the webdriver is running
            if (data.toString().search('INFO - Started SocketListener') > -1) {
                protractor = spawn(protractorBin, [configFile], {stdio: 'inherit'});

                protractor.on('close', function(code) {
                    process.kill(webdriver.pid);
                    process.kill(pid);

                    if (code !== 0) {
                        return grunt.fail.warn(data.toString());
                    }

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
