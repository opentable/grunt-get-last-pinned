'use strict';

var request = require('request'),
    fs = require('fs');

module.exports = function(grunt){

    var setBuildNumber = function(buildInfo, done){
        if (buildInfo.build.length > 0){
            var buildNumber = buildInfo.build[0].number;
            grunt.verbose.writeln('Build number is ' + buildNumber);
            grunt.option("buildNumber", buildNumber);
            done();
        }
        else{
            grunt.fail.fatal('There are no pinned builds in the response');
        }
    };

    grunt.registerMultiTask('get-last-pinned-buildnumber', 'Uses the TeamCity API to ask for a specific projects last pinned build number', function(){
        var options = this.options({});
        grunt.verbose.writeflags(options);

        var done = this.async();
        var url = options.url;
        var buildType = options.buildTypeId;

        url = url + '/guestAuth/app/rest/builds/?locator=buildType:' + buildType + ',status:SUCCESS,pinned:true,count:1';
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
