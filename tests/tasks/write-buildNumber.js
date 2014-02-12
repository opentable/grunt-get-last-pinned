var fs = require('fs'),
    buildNumber = fs.openSync('tests/actual/buildNumber.txt', 'w');

module.exports = function(grunt){
    grunt.registerTask('write-buildNumber', function(){
        fs.writeSync(buildNumber, grunt.option('buildNumber'));
    });
};