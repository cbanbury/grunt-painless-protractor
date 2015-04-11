# grunt-painless-protractor

> Grunt plugin for installing/setting up selnium protractor, and running tests against a local instance of your server
## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-painless-protractor --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-painless-protractor');
```

## The "painless_protractor" task

### Overview
In your project's Gruntfile, add a section named `painless_protractor` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  painless_protractor: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
        config_file: 'protractor_config.js',
        webdriver_bin: 'webdriver-manager',
        protractor_bin: 'protractor',
        test_server: {
            cmd: 'node',
            args: ['server.js']
        }
    },
  },
});
```

### What it does
Getting protractor up and running can be a real headache. This aims to take care of as much of the setup
process as possible, but leaving protractor configuration to its own config file.

- Ensures webdriver-manager is updated
- Starts selenium webdriver
- Optionally start an instance of your local server (useful for CI)
- Run protractor tests using protractor install from node modules.

There is an optional override for `webdriver_bin` and `protractor_bin` path to use your systems own
`protractor` or `webdriver-manager` binaries.

### Options

#### options.config_file
Type: `String`

Path to your protractor config file

#### options.webdriver_bin
Type: `String`
Default value: `node_modules/protractor/bin/webdriver-manager`

Path to webdriver-manager binary

#### options.protractor.bin
Type: `String`
Default value: `node_modules/protractor/bin/webdriver-manager`

Path to protractor binary

### Usage Examples

#### Default Options
*TODO*

#### Custom Options
*TODO*

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
