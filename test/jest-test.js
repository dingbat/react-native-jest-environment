import { expect } from "chai";
import React from "react";

import getJestEnvironment from "../index";
import renderer from "react-test-renderer";

describe("getJestEnvironment", function() {
  it("provides a transforming require", function() {
    this.timeout(10000);
    const mocks = {StatusBar: () => "StatusBar"};
    return getJestEnvironment(mocks).then(mockRequire => {
      const Component = mockRequire(__dirname, "../test-src/component").default;

      const render = renderer.create(<Component />).toJSON();
      expect(render.props.x).to.equal("hi");
      expect(render.type).to.equal("Text");
    });
  });
});
