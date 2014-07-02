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

describe('setting the buildnumber', function(){
    var expected = fs.readFileSync('tests/expected/buildNumber.txt');
    var actual = fs.readFileSync('tests/actual/buildNumber.txt');

    it('should save the json to a file', function(){
        actual.should.eql(expected);
    });
});

describe('setting the buildlastchangeversion', function(){
    var expected = fs.readFileSync('tests/expected/buildLastChangeVersion.txt');
    var actual = fs.readFileSync('tests/actual/buildLastChangeVersion.txt');

    it('should save the json to a file', function(){
        actual.should.eql(expected);
    });
});