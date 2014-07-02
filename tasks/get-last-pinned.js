'use strict';

var request = require('request'),
    fs = require('fs');

module.exports = function(grunt){

    var setBuildNumber = function(buildInfo, done){
        var buildNumber = buildInfo.number;
        grunt.verbose.writeln('##teamcity[buildNumber \''+ buildNumber +'\']');
        grunt.option("buildNumber", buildNumber);
        if(buildInfo.lastChanges.change.length > 0){
            var buildLastChangeVersion = buildInfo.lastChanges.change[0].version;
            grunt.verbose.writeln('##teamcity[setparameter name=\'buildLastChangeVersion\' value=\'' + buildLastChangeVersion + '\']');
            grunt.option("buildLastChangeVersion", buildLastChangeVersion);
        }
        done();
    };

    grunt.registerMultiTask('get-last-pinned-buildnumber', 'Uses the TeamCity API to ask for a specific projects last pinned build number', function(){
        var options = this.options({});
        grunt.verbose.writeflags(options);

        var done = this.async();
        var url = options.url;
        var buildType = options.buildTypeId;

        url = url + '/guestAuth/app/rest/buildTypes/id:' + buildType + '/builds/status:SUCCESS,pinned:true';
        grunt.verbose.writeln('Making request to teamcity ' + url);

        request({
            url: url,
            headers: {
                'Accept' : 'application/json'
            },
            method: 'GET'
        }, function(error, response, body){
            if (error){
                grunt.fail.fatal(error);
            }

            if (response.statusCode === 200){
                grunt.verbose.writeln('The response from TeamCity request: ' + body);
                setBuildNumber(JSON.parse(body), done);
            }
            else {
                grunt.fail.fatal('The response from teamcity was: ' + body);
            }
        });
    });
};
