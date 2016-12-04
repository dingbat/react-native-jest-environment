# react-native-jest-environment

Provides an API in JS to access a React Native Jest runtime, so that you don't
have to use the `jest` CLI to be able to use Jest's great React Native mocking.

## Usage

```js
import getJestEnvironment from "react-native-jest-environment";
import renderer from "react-test-renderer";

getJestEnvironment().then(mockRequire => {
  const Component = mockRequire(__dirname, "../path/to/component");
  const render = renderer.create(<Component />).toJSON();
  // ...
});
```

This was originally made for use with
[cucumber.js](https://github.com/cucumber/cucumber-js)!

A convenient way to access the `mockRequire` in your step definitions is to
load the Jest environment in a `Before` hook in a support file:

```js
import getJestEnvironment from "react-native-jest-environment";

module.exports = function() {
  this.Before(function() {
    return getJestEnvironment().then(mockRequire => {
      this.require = mockRequire.bind(null, __dirname);
    });
  });
};
```

And then in a step...

```js
import React from "react";
import renderer from "react-test-renderer";
import { expect } from "chai";

module.exports = function() {
  this.Given("a component", function() {
    const Something = this.require("test-src/something.js").default;
    this.component = renderer.create(<Something />);
  });

  this.Then("it has a property", function() {
    expect(this.component.toJSON().props.x).to.equal("hi");
  });
};
```
