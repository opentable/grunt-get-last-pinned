var fs = require('fs'),
    should = require('should');

describe('building the url', function(){
    var expected = JSON.parse(fs.readFileSync('tests/expected/request.json'));
    var actual = JSON.parse(fs.readFileSync('tests/actual/request.json'));

    it('should set the host correctly', function(){
        actual.headers.host.should.eql(expected.headers.host);
    });

    it('should use the correct url', function(){
        actual.url.should.eql(expected.url);
    });
});

describe('saving the buildInfo', function(){
    var expected = JSON.parse(fs.readFileSync('tests/expected/buildInfo.json'));
    var actual = JSON.parse(fs.readFileSync('buildInfo.json'));

    it('should save the json to a file', function(){
        actual.should.eql(expected);
    });
});