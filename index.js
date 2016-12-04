var os = require("os");

var Console = require("jest-util").Console;
var newConfig = require("jest-config").normalize;
var Runtime = require("jest-runtime");
var path = require("path");

function getJestEnvironment() {
  var config = newConfig({
    rootDir: process.cwd(),
    preset: "react-native",
  });

  return Runtime.createHasteContext(config, {
    maxWorkers: os.cpus().length - 1,
  }).
  then(function(hasteMap) {
    var mockRequire = function(base, filename) {
      const filePath = path.resolve(base, filename || "");

      const TestEnvironment = require(config.testEnvironment);

      const env = new TestEnvironment(config);
      env.global.console = new Console(process.stdout, process.stderr);
      env.global.jestConfig = config;

      const runtime = new Runtime(config, env, hasteMap.resolver);
      return runtime.requireModule(filePath);
    };

    return mockRequire;
  });
};

module.exports = getJestEnvironment;
