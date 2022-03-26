import { creatStackNavigator,createAppContainer  } from 'react-navigation';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'; 
import {Platform } from 'react-native';
import Colors from '../constents/Colors';
// createStackNavigator is a function that takes a config object and returns a React component
const ProductsNavigator = creatStackNavigator({
 ProductsOverview: ProductsOverviewScreen,
}, {
 defaultNavigationOptions: {
  headerStyle: {
   backgroundColor: Platform.OS === 'android' ? Colors.primary : '' 
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
 }
});
 
export default createAppContainer(ProductsNavigator);