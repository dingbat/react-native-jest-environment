import getJestEnvironment from "../..";
import React from "react";
import renderer from "react-test-renderer";

import { expect } from "chai";

import * as path from "path";

module.exports = function() {
  this.Given("a component", function() {
    this.component = renderer.create(<this.Component />);
    this.render = () => this.component.toJSON();
  });

  this.Then("it has a property", function() {
    expect(this.render().props.x).to.equal("hi");
    expect(this.render().type).to.equal("View");
  });

  this.Then("I can change a native property", function() {
    expect(this.render().children[2].props.value).to.equal("old");
    this.render().children[2].props.changeMe();
  });

  this.Then("I can test the change", function() {
    expect(this.render().children[2].props.value).to.equal("new");
  });
};
