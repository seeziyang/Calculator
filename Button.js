import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AwesomeButton from "react-native-really-awesome-button";

const Button = ({title, onPress}) => (
  <AwesomeButton
    onPress = {onPress}
    width = {100}
    backgroundColor = {"red"}
    backgroundDarker = {"darkred"}
    raiseLevel = {4}
    borderRadius = {10}
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