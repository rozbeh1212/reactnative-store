import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import ShopNavigationScreen from "./navigation/ShopNavigationScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";
//import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./store/reducers/cart";

// combineReducers is a function that takes an object of reducers and returns a function that combines them into one
const rootReducer = combineReducers({
  products: productsReducer,
  cart : cartReducer 
});

// store
const store = createStore(rootReducer,
//  composeWithDevTools()
);
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  }); // returns a promise that resolves when all fonts are loaded successfully and rejects if any fail to load
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    // provider is a component that wraps the whole application and provides the store to all the components
    <Provider store={store}>
      <ShopNavigationScreen />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
