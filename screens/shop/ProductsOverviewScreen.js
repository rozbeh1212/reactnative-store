//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSlector } from "react-redux";
import ProducItem from "../../components/shop/ProductItem";

const ProductItem = (props) => {};
// create a component
const ProductsOverviewScreen = () => {
  // products userSelector is a function that takes the state and returns the userProducts array
  const products = useSlector((state) => state.products.availableproducts);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProducItem
          image={itemData.item.imageUrl} // imageUrl is the property of the item in the array of products from productItem
          title={itemData.item.title} // title is the property of the item in the array of products from productItem
          price={itemData.item.price} // price is the property of the item in the array of products from productItem
          onViewDetail={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            }); // return item  detail
          }}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

// define your styles
const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
