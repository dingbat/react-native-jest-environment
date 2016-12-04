import { expect } from "chai";
import React from "react";

import getJestEnvironment from "../index";

describe("getJestEnvironment", function() {
  it("provides a transforming require", function() {
    this.timeout(10000);
    return getJestEnvironment().then(mockRequire => {
      const {
        Component,
        Text,
        renderer,
      } = mockRequire(__dirname, "../test-src/component.js").default;

      const text = renderer.create(<Text x="5" />);
      expect(text.toJSON().props.x).to.equal("5");

      const component = renderer.create(<Component />);
      expect(component.toJSON().props.x).to.equal("hi");
    });
  });
});
