//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSlector, useDispatch } from "react-redux";
import ProducItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductItem = (props) => {};
// create a component
const ProductsOverviewScreen = () => {
  // products userSelector is a function that takes the state and returns the userProducts array
  const products = useSlector((state) => state.products.availableproducts);
     const dispatch = useDispatch(); // useDispatch is a hook that returns the dispatch function
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
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item)); // dispatch the addToCart action with the itemData.item as the argument  


          }}
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
