//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
 TouchableOpacity,
 TouchableNativeFeedback,
  Platform
} from "react-native";
// create a component
const ProducItem = (props) => {
 let TouchableCmp = TouchableOpacity
 if (Platform.OS === "android" && Platform.Version >= 21) {

  TouchableCmp = TouchableNativeFeedback 
 } 



  return (
    <View styles={styles.product}>
      <View style={styles.touch}>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
          <View>
            <Image styles={styles.Image} source={{ uri: props.image }} />
            <View style={styles.desplayed}>
              <Text styles={styles.title}>{props.title}</Text>
              <Text styles={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View styles={styles.action}>
              <Button
                color={colors.primary}
                title='View Details'
                onPress={props.onViewDetail}
              />
              <Button
                color={colors.primary}
                title='to cart'
                onPress={props.onAddToCart}
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.5, // 0 to 1
    shadowOffset: { width: 0, height: 2 }, //
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    height: 300,
  margin: 20,
  }, // product
  Image: {
    width: "100%", // 100% of the image width will be displayed
    height: "60%", // 60% of the height of the view
  }, // Image
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 4,
  }, // title

  price: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  }, // price

  action: {
    flexDirection: "row", // arrange the buttons in a row
    justifyContent: "space-between",
    alignItems: "center", // align items vertically
    height: "25%",
    paddingHorizontal: 20,
  },

  desplayed: {
    alignItems: "center", // align items vertically
    height: "15%",
    padding: "10px",
 },
 touch: {
  overflow: "hidden",
  borderRadius: 10,
 }
});

export default ProducItem;
