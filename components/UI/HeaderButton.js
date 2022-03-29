//import liraries
import React from "react";
import {  StyleSheet, Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constents/Colors";

// create a component
const HeaderButton = (props) => {
  return (
    <HeaderButton
      {...props} // pass all the props to HeaderButton component from the react-navigation-header-buttons package
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
    />
  );
};

// define your styles
const styles = StyleSheet.create({});

export default HeaderButton;
