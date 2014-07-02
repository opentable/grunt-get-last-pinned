var http = require("http"),
    fs = require("fs"),
    server = {},
    requestFile = fs.openSync('tests/actual/request.json', 'w'),
    buildInfo = '{"id":557202,"number":"MyBuild_123","status":"SUCCESS","buildTypeId":"bt123","startDate":"20140211T061455-0800","webUrl":"http://TeamCity/viewLog.html?buildId=557202&buildTypeId=bt2280","lastChanges":{"change":[{"version":"change_123"}]}}';

module.exports = function(grunt){
    grunt.registerTask('start-server', function(){
        server = http.createServer(function(request, response) {
            fs.writeSync(requestFile, JSON.stringify({ headers: request.headers, url: request.url }));

            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(buildInfo);
            response.end();
        }).listen(8888);
    });
};