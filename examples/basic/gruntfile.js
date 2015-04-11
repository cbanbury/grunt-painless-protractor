'use strict';

module.exports = function(grunt) {
    grunt.loadTasks('../../tasks');

    grunt.initConfig({
        simple_protractor: {
            options: {
              configFile: 'conf.js'
            },
            all: {}
        }
    });

    grunt.registerTask('default', ['simple_protractor']);
};
