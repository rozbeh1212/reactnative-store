//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Button,
} from "react-native";
import { useSlector, useDispatch } from "react-redux";
import ProducItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constents/Colors";

const ProductItem = (props) => {};
// create a component
const ProductsOverviewScreen = () => {
  // products userSelector is a function that takes the state and returns the userProducts array
  const products = useSlector((state) => state.products.availableproducts);
  const dispatch = useDispatch(); // useDispatch is a hook that returns the dispatch function

  const SelectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    }); // return item  detail
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProducItem
          image={itemData.item.imageUrl} // imageUrl is the property of the item in the array of products from productItem
          title={itemData.item.title} // title is the property of the item in the array of products from productItem
          price={itemData.item.price} // price is the property of the item in the array of products from productItem
          onSelect={() => {
            SelectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={colors.primary}
            title='View Details'
            onPress={() => {
              SelectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={colors.primary}
            title='to cart'
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }} // dispatch the addToCart action with the itemData.item as the argument
          />
        </ProducItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    // headerLeft is a property that is used to display the icon on the left side of the header
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='cart'
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer(); // toggleDrawer is a function that is used to open the drawer on the left side of the header
          }}
        />
      </HeaderButtons>
    ),
    // headerRight is a property that is used to display the icon on the right side of the header
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='cart'
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart"); // navigate to cart screen
          }}
        />
      </HeaderButtons>
    ),
  };
};

// define your styles
const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
