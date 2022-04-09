//import liraries
import React, { Component } from "react";
import { FlatList, Button, Platform, Alert,View,Text } from "react-native";
import ProducItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import colors from "../../constents/Colors";
import * as productsActions from '../../store/actions/products';
import { View } from "react-native-web";


// create a component
const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch(); // useDispatch is a hook that returns the dispatch function
  const editedProductHandler = (id) => { // editedProductHandler is a function that is used to navigate to the edit product
    props.navigation.navigate("EditProduct", { productId: id });
  }

   const deleteHandler = (id) => {
     Alert.alert("Are you sure?", "Do you really want to delete this item?", [
       { text: "No", style: "default" },
       {
         text: "Yes",
         style: "destructive",
         onPress: () => {
           dispatch(productsActions.deleteProduct(id));
         },
       },
     ]);
  };
  
  if (userProducts.length === 0) {
    return <View style={{ flex:1, justifyContent:'center', alignItems: 'center' }}>
    <Text></Text>
  </View>
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(Item) => Item.id}
      renderItem={(itemData) => (
        <ProducItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => { editedProductHandler(itemData.item.id)}}
        >
          <Button color={colors.primary} title='Edit' onPress={() => {
             editedProductHandler(itemData.item.id)


          }} />
          <Button color={colors.primary} title='Delete' onPress={() => {
            dispatch(productsActions.DELETE_PRODUCT(itemData.item.id)) // dispatch the deleteProduct action with the itemData.item.id as the argument from the products reducer 
          }} />
        </ProducItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
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
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Add'
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

// define your styles
const styles = StyleSheet.create({});

export default UserProductsScreen;
