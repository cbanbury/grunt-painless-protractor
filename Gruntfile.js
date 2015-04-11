/*
* grunt-painless-protractor
*
*
* Copyright (c) 2015 Carl Banbury
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },
        mocha_istanbul: {
            coverage: {
                src: 'test/painless_protractor.test.js',
                options: {
                    coverage: true,
                    coverageFolder: 'test/coverage',
                    check: {
                        branches: 100
                    },
                    reportFormats: ['text', 'lcov']
                }
            }
        },
        // Configuration to be run (and then tested).
        painless_protractor: {
            basic: {
                options: {
                    config_file: 'test/fixtures/conf.js',
                    test_server: {
                        cmd: 'node',
                        args: ['test/fixtures/server.js']
                    }
                }
            },
            custom_driver: {
                options: {
                    config_file: 'test/fixtures/conf.js',
                    webdriver_bin: 'webdriver-manager',
                    protractor_bin: 'protractor',
                    test_server: {
                        cmd: 'node',
                        args: ['test/fixtures/server.js']
                    }
                }
            }
        },
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-istanbul')

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'mocha_istanbul:coverage']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

    grunt.registerTask('basic', 'painless_protractor:basic');
    grunt.registerTask('custom-webdriver', 'painless_protractor:custom_driver');

};
