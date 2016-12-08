import getJestEnvironment from "..";

module.exports = function() {
  this.Before(function() {
    const mocks = {
      StatusBar: () => "StatusBar",
      TextInput: () => "TextInput",
    };
    return getJestEnvironment(mocks).then(mockRequire => {
      this.Component = mockRequire(__dirname, "../test-src/component").default;
    });
  });
};
