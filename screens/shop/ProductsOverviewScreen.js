//import liraries
import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Platform,
  Button,
  
} from "react-native";
import { useSlector, useDispatch } from "react-redux";
import ProducItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import colors from "../../constents/Colors";

const ProductsOverviewScreen = () => {
  // this is a functional component that returns JSX code that will be rendered to the screen when this screen is called by the user
  const products = useSlector((state) => state.products.availableproducts); // products userSelector is a function that takes the state and returns the userProducts array
  const dispatch = useDispatch(); // useDispatch is a hook that returns the dispatch function
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  

  const loadProducts = useCallback(async () => {
    // useCallback is a hook that returns a memoized version of the function that is passed to it
    setError(null); // setError is a function that is used to set the error state of the component when an error occurs during the fetching of the products from the server and null means no error occurred during the fetching of the products from the server
   // setIsLoading(true); // set the isLoading state to true when the products are Loading from the server
   setIsLoading(true); // set the isLoading state to true when the products are Loading from the server
    try {
      await dispatch(productsActions.fetchProducts()); // fetchProducts is a function that fetch the products from the server and return the products array
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false); // set the isLoading state to false when the products are loaded from the server
  }, [dispatch, setIsLoading, setError]); //setIsLoading in useCallback is a function that is used to set the isLoading state to true when the products are Loading from the server and setError in useCallback is a function that is used to set the error state of the component when an error occurs during the fetching of the products from the server

  useEffect(() => {
   const willFocus= props.navigation.addListener("willFocus", loadProducts) //willFocus is a property that is used to listen to the screen. willFocus means when the user navigates to this screen the loadProducts function will be called and the products will be loaded from the server  
    return () => {
      willFocus.remove()}

  }, [loadProducts]); 

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    })
  }, [dispatch, loadProducts]); //  [] is an array that is used to prevent the function from being called again and again when the component is re-rendered so products can be fetched only once when the component is rendered

  const SelectItemHandler = (id, title) => { // SelectItemHandler is a function that is used to select the product when the user clicks on the product and the id and title of the product are passed to it
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    }); // return item  detail
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An Error occurred</Text>
        <Button
          title='try again'
          onPress={loadProducts}
          color={colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    //if the products array is empty and isLoading is false then return the mwssage that no products are available
    //
    return (
      <View style={styles.centered}>
        <Text>No Product</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts} // this is a property that is used to refresh the products when the user pulls down the screen
      refreshing={isRefreshing} // refreshing is a property that is used to show the loading indicator when the products are being fetched from the server
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
};;

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
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductsOverviewScreen;
