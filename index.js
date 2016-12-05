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
    const TestEnvironment = require(config.testEnvironment);

    const env = new TestEnvironment(config);
    env.global.console = new Console(process.stdout, process.stderr);
    env.global.jestConfig = config;

    const runtime = new Runtime(config, env, hasteMap.resolver);

    const mockRequire = function(base, filename) {
      let filePath = path.resolve(base, filename || "");
      if (!filePath.endsWith(".js")) {
        filePath += ".js";
      }
      const module = runtime.requireModule(filePath);
      Object.keys(mocks).forEach(function(mock) {
        runtime.setMock("", mock, mocks[mock]);
      });
      return module;
    };

    return mockRequire;
  });
};

module.exports = getJestEnvironment;
