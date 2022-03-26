//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSlector } from "react-redux";

// create a component
const ProductsOverviewScreen = () => {
  // products userSelector is a function that takes the state and returns the userProducts array
  const products = useSlector((state) => state.products.availableproducts);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

// define your styles
const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
