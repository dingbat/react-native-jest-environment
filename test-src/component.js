import React from "react";
import { Text } from "react-native";

class Component2 extends React.Component {
  render() {
    return (
      <Text x="hi" />
    );
  }
}

export default class Component extends React.Component {
  render() {
    return (
      <Component2 />
    );
  }
}
