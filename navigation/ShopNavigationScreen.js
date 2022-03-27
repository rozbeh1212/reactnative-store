import { creatStackNavigator, createAppContainer } from "react-navigation";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import { Platform } from "react-native";
import Colors from "../constents/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

// createStackNavigator is a function that takes a config object and returns a React component
const ProductsNavigator = creatStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {// defaultNavigationOptions is a property that is applied to all screens in the navigator
      headerStyle: { 
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
      headerBackTitleStyle: { 
        fontFamily: "open-sans",
      },

      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
