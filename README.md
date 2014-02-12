# grunt-get-last-pinned [![Build Status](https://travis-ci.org/andyroyle/grunt-get-last-pinned.png?branch=master)](https://travis-ci.org/andyroyle/grunt-get-last-pinned) [![NPM version](https://badge.fury.io/js/grunt-get-last-pinned.png)](http://badge.fury.io/js/grunt-get-last-pinned) ![Dependencies](https://david-dm.org/andyroyle/grunt-get-last-pinned.png)


Get the last-pinned build number from a teamcity build

Pretty esoteric at the moment, so maybe it's only me that'll use it.

Provides the task `get-last-pinned-buildnumber`, which downloads the buildNumber of the last pinned build from the teamcity api and populates the grunt.option('buildNumber') property.

```
grunt.initConfig({
  'get-last-pinned-buildnumber': {
    'myproject': {
      options: {
        url: 'http://myteamcity.server',
        buildTypeId: 'mybuildTypeId'
      }
    }
  }
});
```