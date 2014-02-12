grunt-get-last-pinned
=====================

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