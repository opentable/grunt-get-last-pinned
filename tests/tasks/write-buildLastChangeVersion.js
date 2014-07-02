var fs = require('fs'),
    buildLastChangeVersion = fs.openSync('tests/actual/buildLastChangeVersion.txt', 'w');

module.exports = function(grunt){
    grunt.registerTask('write-buildLastChangeVersion', function(){
        fs.writeSync(buildLastChangeVersion, grunt.option('buildLastChangeVersion'));
    });
};