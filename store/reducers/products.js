import { Product } from "../../data/dummy-data";

// imitial state

const initialState = {
  availableproducts: Product, // products array
  userProducts: Product.filter((product) => product.ownerId === "u1"), // products array ,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT: /* if the action type is DELETE_PRODUCT we are deleting the product from the products array and we are updating the userProducts array with the new userProducts array and 
                        we are updating the total amount of the cart with the new total amount */           
      return {
        ...state,  
        userProducts: state.userProducts.filter(        
          (product) => product.id !== action.pid
        ),
        availableproducts: state.availableproducts.filter(
          (product) => product.id !== action.pid
      };
  }
  return state;
};
