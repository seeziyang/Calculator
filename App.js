import React, {Component} from 'react';
import {StyleSheet, Text, View, Vibration} from 'react-native';
import Button from './Button.js';

export default class App extends Component {

  state = {
    input: "",
    haveError: false,
    isNonDec: false
  };

  vibrate = () => Vibration.vibrate(6);
  
  equal = () => {
    this.vibrate();

    try {
      let result = eval(this.state.input.replace(/×/g, "*")
                                        .replace(/÷/g, "/"));

      if (result === Infinity || Number.isNaN(result)) {
        throw "error";
      }

      if (result === undefined) {
        result = "";
      }

      // if (!Number.isInteger(result)) {
      //   result = result.toFixed(8);
      // }

      this.setState({
        input: "" + result,
      });
    } catch (error) {
      this.setState({
        input: "invalid input",
        haveError: true
      });
    }
  }

  toBinOrHex = (base) => {
    this.vibrate();

    if (this.state.isNonDec) {
      return;
    }

    try {
      let result = eval(this.state.input.replace(/×/g, "*")
                                        .replace(/÷/g, "/"));

      if (result === Infinity || Number.isNaN(result)) {
        throw "error";
      }

      result = result.toString(base).toUpperCase();
      this.setState({
        input: result,
        isNonDec: true
      });
    } catch (error) {
      this.setState({
        input: "invalid input",
        haveError: true
      });
    }
  }

  toOnes = () => {
    this.vibrate();

    if (this.state.isNonDec) {
      return;
    }

    try {
      let result = eval(this.state.input.replace(/×/g, "*")
                                        .replace(/÷/g, "/"));

      if (result === Infinity || Number.isNaN(result)
          || result < -127 || result > 127) {
        throw "error";
      } 
      
      let isNegative = result < 0;
      result = (Math.abs(result)).toString(2).padStart(8, "0");
      if (isNegative) {
        result = result.replace(/0/g, "a")
                       .replace(/1/g, "0")
                       .replace(/a/g, "1");
      }

      this.setState({
        input: result,
        isNonDec: true
      });
    } catch (error) {
      this.setState({
        input: "invalid input",
        haveError: true
      });
    }
  }

  toTwos = () => {
    this.vibrate();

    if (this.state.isNonDec) {
      return;
    }

    try {
      let result = eval(this.state.input.replace(/×/g, "*")
                                        .replace(/÷/g, "/"));

      if (result === Infinity || Number.isNaN(result)
          || result < -128 || result > 127) {
        throw "error";
      } 
      
      let isNegative = result < 0;
      result = (Math.abs(result)).toString(2).padStart(8, "0");
      if (isNegative) {
        result = (parseInt(result.replace(/0/g, "a")
                                .replace(/1/g, "0")
                                .replace(/a/g, "1"), 2) + 1).toString(2);
      }
      
      this.setState({
        input: result,
        isNonDec: true
      });
    } catch (error) {
      this.setState({
        input: "invalid input",
        haveError: true
      });
    }
  }

  clear = () => {
    this.vibrate();

    this.setState({
      input: "",
      haveError: false
    });
  }

  backspace = () => {
    this.vibrate();

    if (this.state.haveError || this.state.isNonDec) {
      this.setState({
        input: "",
        haveError: false,
        isNonDec: false
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
    this.vibrate();

    if (this.state.haveError || this.state.isNonDec) {
      this.setState({
        input: x.replace("+", " + ")
                .replace("-", " - ")
                .replace("×", " × ")
                .replace("÷", " ÷ "),
        haveError: false,
        isNonDec: false
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
      <View style = {styles.page}>
        <View style = {styles.screen}>
          <Text style = {styles.input} numberOfLines = {1}>
            {this.state.input}
          </Text>
        </View>

        <View style = {styles.buttonRow}>
          <Button
            title = {"1's"}
            onPress = {this.toOnes}
          />

          <Button
            title = {"2's"}
            onPress = {this.toTwos}
          />

          <Button
            title = {"BIN"}
            onPress = {() => this.toBinOrHex(2)}
          />

          <Button
            title = {"HEX"}
            onPress = {() => this.toBinOrHex(16)}
          />
        </View>

        <View style = {styles.buttonRow}>
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

        <View style = {styles.buttonRow}>
          {["7", "8", "9", "×"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
            />
          ))}
        </View>

        <View style = {styles.buttonRow}>
          {["4", "5", "6", "-"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
            />
          ))}
        </View>
        
        <View style = {styles.buttonRow}>
          {["1", "2", "3", "+"].map((element, index) => (
            <Button
              key = {index}
              title = {element}
              onPress = {() => this.symbol(element)}
            />
          ))}
        </View>

        <View style = {styles.buttonRow}>
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

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 25,
    backgroundColor: "#FFEBCD",
    borderRadius: 14
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 25
  },
  input: {
    fontSize: 40,
    color: "black",
    fontWeight: "bold"
  }
});
