"use strict";

var os = require("os");

var Console = require("jest-util").Console;
var newConfig = require("jest-config").normalize;
var Runtime = require("jest-runtime");
var path = require("path");

function getJestEnvironment(mocks) {
  mocks = mocks || {};

  var config = newConfig({
    rootDir: process.cwd(),
    preset: "react-native",
  });

  return Runtime.createHasteContext(config, {
    maxWorkers: os.cpus().length - 1,
  }).
  then(function(hasteMap) {
    var TestEnvironment = require(config.testEnvironment);

    var env = new TestEnvironment(config);
    env.global.console = new Console(process.stdout, process.stderr);
    env.global.jestConfig = config;

    var runtime = new Runtime(config, env, hasteMap.resolver);

    var mockRequire = function(base, filename) {
      var filePath = path.resolve(base, filename || "");
      if (!filePath.endsWith(".js")) {
        filePath += ".js";
      }
      var module = runtime.requireModule(filePath);
      Object.keys(mocks).map(function(mock) {
        runtime.setMock("", mock, mocks[mock]);
      });
      return module;
    };

    return mockRequire;
  });
};

module.exports = getJestEnvironment;
