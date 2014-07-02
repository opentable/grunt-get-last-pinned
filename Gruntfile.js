module.exports = function(grunt) {
    'use strict';

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
        mochaTest:{
            options: {
                reporter: 'spec'
            },
            tests:{
                src: ['tests/get-last-pinned-tests.js']
            }
        },
        'get-last-pinned-buildnumber': {
            'test': {
                options: {
                    url: 'http://127.0.0.1:8888',
                    buildTypeId: 123
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', ['jshint', 'start-server', 'get-last-pinned-buildnumber:test', 'write-buildNumber', 'write-buildLastChangeVersion', 'mochaTest']);
    grunt.registerTask('default', ['test']);
    grunt.loadTasks('tasks');
    grunt.loadTasks('tests/tasks');
};