# react-native-jest-environment

[![npm version](https://badge.fury.io/js/react-native-jest-environment.svg)](https://www.npmjs.com/package/react-native-jest-environment)
[![build status](https://api.travis-ci.org/dingbat/react-native-jest-environment.svg)](https://travis-ci.org/dingbat/react-native-jest-environment)

Provides an API in JS to access a React Native Jest runtime, so that you don't
have to use the `jest` CLI to be able to use Jest's great React Native mocking.

## Usage

```js
import getJestEnvironment from "react-native-jest-environment";
import renderer from "react-test-renderer";

// Any optional mocks that might reach into native
// Think jest.mock()
const mocks = { StatusBar: () => "StatusBar" };
getJestEnvironment(mocks).then(mockRequire => {
  const Component = mockRequire(__dirname, "../path/to/component");
  const render = renderer.create(<Component />).toJSON();
  // ...
});
```

## Cucumber

This was originally made for use with
[cucumber.js](https://github.com/cucumber/cucumber-js)!

A convenient way to access the `mockRequire` in your step definitions is to
load the Jest environment in a `Before` hook in a support file:

```js
import * as path from "path";
import getJestEnvironment from "react-native-jest-environment";

module.exports = function() {
  this.Before(function() {
    const mocks = { StatusBar: () => "StatusBar" };
    return getJestEnvironment(mocks).then(mockRequire => {
      // Base all requires off the source path
      const srcPath = path.resolve(__dirname, "../test-src");
      this.require = mockRequire.bind(null, srcPath);
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
    const Component = this.require("component").default;
    this.component = renderer.create(<Component />);
  });

  this.Then("it has a property", function() {
    expect(this.component.toJSON().props.x).to.equal("hi");
  });
};
```
