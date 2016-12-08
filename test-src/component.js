import React from "react";
import { Text, View, StatusBar, TextInput } from "react-native";

class Component2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: "old"};
  }

  render() {
    return (
      <View x="hi">
        <Text />
        <StatusBar />
        <TextInput
          changeMe={() => this.setState({value: "new"})}
          value={this.state.value}
        />
      </View>
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
