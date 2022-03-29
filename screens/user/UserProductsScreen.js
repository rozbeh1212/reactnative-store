//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Platform} from "react-native";
import ProducItem from "../../components/shop/ProductItem";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

// create a component
const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(Item) => Item.id}
      renderItem={(itemData) => (
        <ProducItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
 return {
  headerTitle: 'Your Products', 
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
};
}

// define your styles
const styles = StyleSheet.create({});

export default UserProductsScreen;
