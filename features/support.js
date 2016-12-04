import getJestEnvironment from "..";
import * as path from "path";

module.exports = function() {
  this.Before(function() {
    return getJestEnvironment().then(mockRequire => {
      const srcPath = path.resolve(__dirname, "../test-src");
      this.require = mockRequire.bind(null, srcPath);
    });
  });
};
