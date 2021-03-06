import React from "react";
import { View, Text, FlatList, Button, StyleSheet,ActivityIndicator } from "react-native";
import { useSelector, useDispatch, useState } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import { async } from "validate.js";
import { set } from "react-native-reanimated";




const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount); // cartTotalAmount is the total amount of the cart
  const cartItems = useSelector((state) => {
    // cartItems is the array of the cart items with the productId, productTitle, productPrice, quantity, sum
    const transformedCartItems = [];
    const [isLoading, setIsLoading] = useState(false);
    for (const key in state.cart.items) {
      /* for (const key in state.cart.items) is iterating through the cartItems object and adding the key and the value to the transformedCartItems to transform the cartItems object to an array of objects
                                            transformedCartItems holds the cartItems object with the productId, productTitle, productPrice, quantity, sum in array */
      transformedCartItems.push({
        // transformedCartItems.push({}), pushes the productId, productTitle, productPrice, quantity, sum into the transformedCartItems array
        productId: key, // productId
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    // return transformedCartItems array with the productId, productTitle, productPrice, quantity, sum
    return transformedCartItems.sort(
      (
        a, // a is the first element of the transformedCartItems array and b is the second element of the transformedCartItems array
        b
      ) => (a.productId > b.productId ? -1 : 1) // if a.productId is greater than b.productId, return -1, else return 1 and sort the transformedCartItems array by productId in ascending order by using the sort method
    );
  });
  const dispatch = useDispatch();
  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount)); // dispatch the addOrder action with the cartItems and cartTotalAmount as the arguments
  
   setIsLoading(false);


  };


  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)) * 100 / 100}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
              color={Colors.accent}
              title='Order Now'
              disabled={cartItems.length === 0}
              onPress={ sendOrderHandler}
              />
          )}
        
       
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
            onRemove={() => {
              dispatch(cartActions.removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};


OrderScreen.navigationOptions = {
  headrTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // justifyContent is used to align the items horizontally
    marginBottom: 20,
    padding: 10,
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
