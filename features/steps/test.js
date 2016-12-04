import React from "react";
import renderer from "react-test-renderer";
import { expect } from "chai";

module.exports = function() {
  this.Given("a component", function() {
    const Component = this.require("component.js").default;
    this.component = renderer.create(<Component />);
  });

  this.Then("it has a property", function() {
    expect(this.component.toJSON().props.x).to.equal("hi");
  });
};
