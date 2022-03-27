import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../../constants/Colors";
//import CartItem from "../../components/shop/CartItem";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);// cartTotalAmount is the total amount of the cart
  const cartItems = useSelector((state) => { // cartItems is the array of the cart items with the productId, productTitle, productPrice, quantity, sum
    const transformedCartItems = [];  
   for (const key in state.cart.items) {  // for (const key in state.cart.items) is iterating through the cartItems object and adding the key and the value to the transformedCartItems to transform the cartItems object to an array of objects 
     // transformedCartItems holds the cartItems object with the productId, productTitle, productPrice, quantity, sum in array  
     transformedCartItems.push({ // transformedCartItems.push({}), pushes the productId, productTitle, productPrice, quantity, sum into the transformedCartItems array
       productId: key,       // productId  
       productTitle: state.cart.items[key].productTitle, 
       productPrice: state.cart.items[key].productPrice,
       quantity: state.cart.items[key].quantity,
       sum: state.cart.items[key].sum,
     });
   }
    return transformedCartItems; // return transformedCartItems array with the productId, productTitle, productPrice, quantity, sum 
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title='Order Now'
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
