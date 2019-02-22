/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from './Button.js';

type Props = {};
export default class App extends Component<Props> {

  state = {
    input: "",
    haveError: false
  };

  equal = () => {
    try {
      let result = eval(this.state.input.replace("×", "*")
                                        .replace("÷", "/"));
      this.setState({
        input: result,
      });
    } catch (error) {
      this.setState({
        input: "invalid input",
        haveError: true
      });
    }
  }

  clear = () => {
    this.setState({
      input: "",
      haveError: false
    });
  }

  backspace = () => {
    if (this.state.haveError) {
      this.setState({
        input: "",
        haveError: false
      });
    } else {
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
  }

  symbol = (x) => {
    if (this.state.haveError) {
      this.setState({
        input: x.replace("+", " + ")
                .replace("-", " - ")
                .replace("×", " × ")
                .replace("÷", " ÷ "),
        haveError: false
      });
    } else {
      this.setState({
        input: this.state.input + x.replace("+", " + ")
                                  .replace("-", " - ")
                                  .replace("×", " × ")
                                  .replace("÷", " ÷ ")
      });
    }
  }

  render() {
    return (
      <View style = {{flex: 0.75}}>
        <View style = {styles.container}>
          <Text style = {styles.screen}> {this.state.input} </Text>
        </View>

        <View style={styles.buttonRow}>
          <Button
            title = {"<"}
            onPress = {this.backspace}
          />
          
          {["(", ")", "÷"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          {["7", "8", "9", "×"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          {["4", "5", "6", "-"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
            />
          ))}
        </View>
        
        <View style={styles.buttonRow}>
          {["1", "2", "3", "+"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          <Button
            title = "C"
            onPress = {this.clear}
          />
          
          {["0", "."].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
            />
          ))}

          <Button
            title = "="
            onPress = {this.equal}
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
    justifyContent: 'space-between',
  },
  screen: {
    fontSize: 40,
    color: "black"
  }
});
