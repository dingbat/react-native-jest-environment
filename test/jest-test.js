import { expect } from "chai";
import React from "react";

import getJestEnvironment from "../index";
import renderer from "react-test-renderer";

describe("getJestEnvironment", function() {
  it("provides a transforming require", function() {
    this.timeout(20000);
    const mocks = {
      StatusBar: () => "StatusBar",
      TextInput: () => "TextInput",
    };
    return getJestEnvironment(mocks).then(mockRequire => {
      const Component = mockRequire(__dirname, "../test-src/component").default;

      const component = renderer.create(<Component />)
      const render = component.toJSON();

      expect(render.props.x).to.equal("hi");
      expect(render.type).to.equal("View");

      expect(component.toJSON().children[2].props.value).to.equal("old");
      component.toJSON().children[2].props.changeMe();
      expect(component.toJSON().children[2].props.value).to.equal("new");
    });
  });
});
