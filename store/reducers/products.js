import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (
    action.type // action.type is the same as the type property in the action object
  ) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === "u1"),
      };

    case CREATE_PRODUCT: // CREATE_PRODUCT is the same as the action.type property in the action object
      const newProduct = new Product( // newProduct is a new instance of Product from the Product model
        // new Date().toString(),
        action.productData.id, // action.productData.id is the same as the id property in the action.produc
        "u1",
        action.productData.title, // action.productData.title is the same as the title property in the productData object
        action.productData.imageUrl, // action.productData.imageUrl is the same as the imageUrl property in the productData object
        action.productData.description, // action.productData.description is the same as the description property in the productData object
        action.productData.price // action.productData.price is the same as the price property in the productData object
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT: // action.pid is the same as the pid property in the action object
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedProduct = new Product( // updatedProduct is a new instance of Product from the Product model for the updated product
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts]; //  updatedUserProducts is a new array of the userProducts replace with pervious array
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT: //  deleteproduct is the same as the pid property in the action object
      return {
        ...state,
        userProducts: state.userProducts.filter(
          // filter the userProducts array to remove the product with the id of the action.pid
          (product) => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.pid
        ),
      };
  }
  return state;
};
