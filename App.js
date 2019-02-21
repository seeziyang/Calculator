/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

type Props = {};
export default class App extends Component<Props> {

  state = {
    input: "",
    output: "",
    haveOutput: false
  };

  equal = () => {
    try {
      let result = eval(this.state.input.replace("×", "*")
                                        .replace("÷", "/"));
      this.setState({
        input: "",
        output: result,
        haveOutput: true
      });
    } catch (error) {
      this.setState({
        input: "",
        output: "invalid input",
        haveOutput: true
      });
    }
  }

  clear = () => {
    this.setState({
      input: "",
      output: "",
      haveOutput: false
    });
  }

  backspace = () => {
    let currInput = this.state.input;
    if (currInput.length >= 1 && currInput[currInput.length - 1] !== " ") {
      this.setState({
        input: currInput.substring(0, currInput.length - 1)
      });
    } else if (currInput.length >= 3 && currInput[currInput.length - 1] === " ") {
      this.setState({
        input: currInput.substring(0, currInput.length - 3)
      });
    }
  }

  symbol = (x) => {
    if (this.state.haveOutput) {
      this.clear();
    }
    this.setState({
      input: this.state.input + x.replace("+", " + ")
                                 .replace("-", " - ")
                                 .replace("×", " × ")
                                 .replace("÷", " ÷ ")
    });
  }

  render() {
    return (
      <View style = {{flex: 0.5}}>
        <View style = {styles.container}>
          <Text style = {{fontSize: 20}}> {this.state.input} </Text>
          <Text style = {{fontSize: 20}}> {this.state.output} </Text>
        </View>

        <View style={styles.buttonRow}>
          <AwesomeButton
            onPress = {this.backspace}
            width = {100}
            backgroundColor = {"red"}
          >
            <Text>{"<"}</Text>
          </AwesomeButton>
          
          {["(", ")", "÷"].map((element, index) => (
            /*<Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
              color = "red"
            />*/
            <AwesomeButton
              key = {index}
              onPress = {() => this.symbol(element)}
              width = {100}
              backgroundColor = {"red"}
            >
              <Text>{element}</Text>
            </AwesomeButton>
          ))}
        </View>

        <View style={styles.buttonRow}>
          {["7", "8", "9", "×"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
              color = "red"
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          {["4", "5", "6", "-"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
              color = "red"
            />
          ))}
        </View>
        
        <View style={styles.buttonRow}>
          {["1", "2", "3", "+"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
              color = "red"
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          <Button
            title = "C"
            onPress = {this.clear}
            color = "red"
          />
          
          {["0", "."].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
              color = "red"
            />
          ))}

          <Button
            title = "="
            onPress = {this.equal}
            color = "red"
          />
        </View>
      </View>
    );
  }
}

let row1 = ["<", "(", ")", "÷"];
let row2 = ["7", "8", "9", "×"];
let row3 = ["4", "5", "6", "-"];
let row4 = ["1", "2", "3", "+"];
let row5 = ["C", "0", ".", "="];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
