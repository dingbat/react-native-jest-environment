import React from "react";
import { Text, StatusBar } from "react-native";

class Component2 extends React.Component {
  render() {
    return (
      <Text x="hi"><StatusBar /></Text>
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
