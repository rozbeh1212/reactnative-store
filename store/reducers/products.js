
import { Product } from "../../data/dummy-data";

// imitial state

const initialState = {

  availableproducts: Product , // products array
  userProducts: Product.filter(product => product.ownerId ==='u1')// products array ,
};

export default (state = initialState, action) => {
  

  switch (action.type) {
    case "SET_PRODUCTS"
      return {
        availableproducts: action.products,
        userProducts: action.products.filter(
          product => product.ownerId === "u1"
        ),
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        availableproducts: state.availableproducts.concat(action.product),
        userProducts: state.userProducts.concat(action.product),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        availableproducts: state.availableproducts.filter(
          product => product.id !== action.pid
        ),
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
      };
    default:
      return state;
  }
 

};
