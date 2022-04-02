import { async } from "validate.js";
import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      // async is a function that returns a promise that is resolved when the product is created.
      const response = await fetch(
        "https://reactnative-shop-b085d-default-rtdb.firebaseio.com/.products.json"
        // fetch  product from database and return a promise that is resolved when the product is created
      );

      if (!response.ok) { // if the response is not ok, throw an error
        throw new Error ('Somthing went wrong') 
      }

      const restData = await response.json();
      const loadedProducts = []; // store the loaded products in the array of products returned from the server
      for (const key in restData) {
        // loop through the restData object from the server and add it to the loadedproducts array  by using the key property of the loadedproducts object as the id of the product returned from the server
        loadedProducts.push(
          new Product(
            key,
            restData[key].ownerId,
            restData[key].title,
            restData[key].imageUrl,
            restData[key].description,
            restData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts }); // dispatch the SET_PRODUCTS action with the loadedProducts array as the products property of the action object passed to the dispatch function
      // dispatch use setproducts and loaded Products to set the products state  in the reducer function to be executed when the action is executed
    } catch (err) {
      throw err; // 
    }
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, pid: productId }; 
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // async is a function that returns a promise that is resolved when the product is created.
    const response = await fetch( 
      // fetch  product from database and return a promise that is resolved when the product is created
      "https://reactnative-shop-b085d-default-rtdb.firebaseio.com/.products.json",
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
      },
    });
  };
};
export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl,
    },
  };
};
