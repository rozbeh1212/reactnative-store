import { async } from "validate.js";
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      // async is a function that returns a promise that is resolved when the product is created.
      const response = await fetch(
        "https://reactnative-shop-b085d-default-rtdb.firebaseio.com/.products.json"
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
        loadedProducts.push(
          new Product(
            action.productData.id,
            restData[key].ownerId,
            restData[key].title,
            restData[key].imageUrl,
            restData[key].description,
            restData[key].price
          )
        );
      }
      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      }); // dispatch the SET_PRODUCTS action with the loadedProducts array as the products property of the action object passed to the dispatch function
      // dispatch use setproducts and loaded Products to set the products state  in the reducer function to be executed when the action is executed
    } catch (err) {
      throw err; //
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    await fetch(
      `https://reactnative-shop-b085d-default-rtdb.firebaseio.com/.products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

// return { type: DELETE_PRODUCT, pid: productId };
// };

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId; // the userId from current user that is logged in
    // async is a function that returns a promise that is resolved when the product is created.
    const response = await fetch(
      // fetch  product from database and return a promise that is resolved when the product is created
      `https://reactnative-shop-b085d-default-rtdb.firebaseio.com/.products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          // body is the data that is sent to the server when the product is created and json.stringify is a function that converts the data to a string
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        }),
      }
    );

    const restData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: restData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
      },
    });
  };
};
export const updateProduct = (id, title, description, imageUrl) => {
  // update product action creator with product id, title, description, imageUrl as parameters and return an action object to update
  return async (dispatch, getState) => {
    const token = getState().auth.token; // get the token from the auth state to send it to the server and update the product in the database
    // async is a function that returns a promise that is resolved when the product is created.
    await fetch(
      //
      `https://reactnative-shop-b085d-default-rtdb.firebaseio.com/.products/${id}.json?auth=${token}`, // requestInfo input is the url of the product  that is fetched from the database  by using the id of the product that is passed to the action creator
      {
        method: "PATCH", // patch is a method that is used to patch the product that is fetched from the database  by using the id of the product that is passed
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );
  };
};
