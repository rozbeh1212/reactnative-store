import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import ShopNavigationScreen from './navigation/ShopNavigationScreen';
// combineReducers is a function that takes an object of reducers and returns a function that combines them into one
const rootReducer = combineReducers({
  products: productsReducer,
});

// store 
const store = createStore(rootReducer);

export default function App() {
  return (
    // provider is a component that wraps the whole application and provides the store to all the components
    <Provider store={store}>
      <ShopNavigationScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
