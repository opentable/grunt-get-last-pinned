'use strict';

var request = require('request'),
    fs = require('fs'),
    outputFile = 'buildInfo.json';

module.exports = function(grunt){

    var options = this.options({});

    var saveBuildInfo = function(buildInfo, done){
        if (buildInfo.build.length > 0){
            grunt.verbose.writeln('Build number is ' + buildInfo.build[0].number);

            fs.writeFile(outputFile, JSON.stringify(buildInfo), function(err) {
                if(err) {
                    grunt.fail.fatal(err);
                } else {
                    grunt.log.debug("JSON saved to " + outputFile);
                    done();
                }
            });
        }
        else{
            grunt.fail.fatal('There are no pinned builds in the response');
        }
    };

    grunt.registerTask('set-buildnumber', 'Reads the last pinned build number from file and populates property', function(){
        var buildInfo = JSON.parse(fs.readFileSync(outputFile));
        var buildNumber = buildInfo.build[0].number;
        grunt.log.debug('Build number in local file is ' + buildNumber);
        grunt.option("buildNumber", buildNumber);
    });

    grunt.registerTask('get-last-pinned-buildnumber', 'Uses the TeamCity API to ask for a specific projects last pinned build number', function(){

        grunt.verbose.writeln('Getting last pinned build...');
        grunt.config.requires(options.url);
        grunt.config.requires(options.buildTypeId);

        var done = this.async();
        var url = options.url;
        var buildType = options.buildTypeId;

        url = url + '/guestAuth/app/rest/builds/?locator=buildType:' + buildType + ',status:SUCCESS,pinned:true,count:1'
        grunt.log.debug('Making request to teamcity ' + url);

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
            if (response.statusCode == 200){
                grunt.verbose.debug('The response from TeamCity request: ' + body);
                saveBuildInfo(JSON.parse(body), done);
            }
        });
    });
};