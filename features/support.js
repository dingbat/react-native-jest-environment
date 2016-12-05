import getJestEnvironment from "..";
import * as path from "path";

module.exports = function() {
  this.Before(function() {
    const mocks = {StatusBar: () => "StatusBar"};
    return getJestEnvironment(mocks).then(mockRequire => {
      const srcPath = path.resolve(__dirname, "../test-src");
      this.require = mockRequire.bind(null, srcPath);
    });
  });
};
