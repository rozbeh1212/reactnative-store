export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product) => { // product is an object  {id: 1, title: "...", price: 10, imageUrl: "..."} and we are adding it to the cart with the id of the product
  return {
    type: ADD_TO_CART,
    product,
  };
}