import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";

class Component2 extends React.Component {
  render() {
    return (
      <Text x="hi" />
    );
  }
}

class Component extends React.Component {
  render() {
    return (
      <Component2 />
    );
  }
}

export default {
  Component,
  Text,
  renderer,
};
