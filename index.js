var os = require("os");

var Console = require("jest-util").Console;
var newConfig = require("jest-config").normalize;
var Runtime = require("jest-runtime");

function getJestEnvironment() {
  var config = newConfig({
    rootDir: process.cwd(),
    preset: "react-native",
  });

  return Runtime.createHasteContext(config, {
    maxWorkers: os.cpus().length - 1,
  }).
  then(function(hasteMap) {
    var mockRequire = function(filename) {
      const TestEnvironment = require(config.testEnvironment);

      const env = new TestEnvironment(config);
      env.global.console = new Console(process.stdout, process.stderr);
      env.global.jestConfig = config;

      const runtime = new Runtime(config, env, hasteMap.resolver);
      return runtime.requireModule(filename);
    };

    return mockRequire;
  }).
  catch(function(e) {
    console.error(e);
    process.on("exit", function() {
      process.exit(1);
    });
  });
};

module.exports = getJestEnvironment;
