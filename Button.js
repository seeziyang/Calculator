import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";

const Button = ({title, onPress}) => (
  <AwesomeButton
    onPress = {onPress}
    width = {75}
    backgroundColor = {"#FF6961"}
    backgroundDarker = {"#cc544d"}
    raiseLevel = {10}
    springRelease = {true}
    borderRadius = {14}
  >
    <Text style = {styles.buttonText}>
      {title}
    </Text>
  </AwesomeButton>
);

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
});

export default Button;