import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER"; // this is the action type
export const SET_ORDER = "SET_ORDER"; // this is the action type

export const fetchOreders = () => {
  return async (dispatch, getState) => {
    try {
      // async is a function that returns a promise that is resolved when the product is created.
      const response = await fetch(
        "https://reactnative-shop-b085d-default-rtdb.firebaseio.com/orders.json"
        // fetch  product from database and return a promise that is resolved when the product is created
      );

      if (!response.ok) {
        // if the response is not ok, throw an error
        throw new Error("Somthing went wrong");
      }

      const restData = await response.json();
      const loadedProducts = []; // store the loaded products in the array of products returned from the server
      for (const key in restData) {
        // loop through the restData object from the server and add it to the loadedproducts array  by using the key property of the loadedproducts object as the id of the product returned from the server
        loadedProducts.push(new Order(key, restData[key].cartItems, restData[key].totlalAmount, restData[key].date));
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts }); // dispatch the SET_PRODUCTS action with the loadedProducts array as the products property of the action object passed to the dispatch function
      // dispatch use setproducts and loaded Products to set the products state  in the reducer function to be executed when the action is executed
    } catch (err) {
      throw err; 
    }
    dispatch({ type: SET_ORDER, order: loadedOrders });
  };
};

export const addOrder = (cartItems, totlalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    // fetch  product from database and return a promise that is resolved when the product is created
    const response = await fetch(
      `https://reactnative-shop-b085d-default-rtdb.firebaseio.com/orders.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          // body is the data that is sent to the server when the product is created and json.stringify is a function that converts the data to a string
          cartItems,
          totlalAmount,
          date: new Date().toISOString(),
        }),
      }
    );

    if (!restData.ok) {
      throw new Error("Something went wrong");
    }

    const restData = await response.json(); // restData user add an orders item to the list

    dispatch({
      // dispatch is a function with orderData as an argument and return an action object to update the order data
      type: ADD_ORDER,
      orderData: {
        id: restData.name,
        cartItems,
        totlalAmount,
        date: new Date().toISOString(),
      },
    });
  };
};
