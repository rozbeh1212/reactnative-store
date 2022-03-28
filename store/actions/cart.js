export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";


export const addToCart = (product) => {
  return {
    type: ADD_TO_CART, // type is the name of the action
    product, // product is an object  {id: 1, title: "...", price: 10, imageUrl: "..."} and we are adding it to the cart with the id of the product
  };
};

export const removeFromCart = (product) => { 
  return {
    type: REMOVE_FROM_CART, // type is the name of the action
    product, // product is an object  {id: 1, title: "...", price: 10, imageUrl: "..."} and we are adding it to the cart with the id of the product
  };
}