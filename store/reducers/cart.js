import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";


const initialState = {
  // initial state of the cart

  items: {}, // {id: {product: {}, quantity: 2}}
  totalAmount: 0, // total amount of all items in cart
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product; // product is an object {quantity: number, productprice: number, producttitle: string, sum: number} and we are adding it to the cart with the id of the product
      const prodPrice = addedProduct.price; 
      const prodTitle = addedProduct.title; 

       let updatedOrNewCartItem; // updatedOrNewCartItem is an object {quantity: number, productprice: number, producttitle: string, sum: number} and we are adding it to the cart  
    
    
      if (state.items[addedProduct.id]) {
        // if the item is already in the cart
         updatedOrNewCartItem = new CartItem( // we are creating a new cart item with the quantity of the item in the cart + 1
           state.items[addedProduct.id].quantity + 1, // the quantity of the item in the cart + 1
           prodPrice, // the price of the item in the cart
           prodTitle, // the title of the item in the cart
           state.items[addedProduct.id].sum + prodPrice // the sum of the item in the cart + the price of the items
         );
      } else {
  updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice); // we are creating a new cart item with the quantity of 1, the price of the product, the title of the product and the sum of the product price

        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updatedOrNewCartItem,
          },
          totalAmount: state.totalAmount + prodPrice, // we are updating the total amount of the cart with the new total amount
       };
       case REMOVE_FROM_CART:
       const selectedCartItem = state.items[action.product.id]; // selectedCartItem is an object {quantity: number, productprice: number, producttitle: string, sum: number} and we are adding it to the cart
    const CurrentQty = state.items[action.pid].quantity; // CurrentQty is the quantity of the item in the cartItems
    let updatedCartItems; // updatedCartItems is an object {quantity: number, productprice: number, producttitle: string, sum: number} and we are adding it to the cart
    if (CurrentQty > 1) {
     const updatedCartItems = new CartItem(selectedCartItem.quantity - 1,
      selectedCartItem.productPrice, // the price of the item in the cartItems
      selectedCartItem.productTitle, // the title of the item in the cartItems
      selectedCartItem.sum - selectedCartItem.productPrice // the sum of the item in the cartItems - the price of the items
     
     )   
     updatedCartItems = { // we are creating a new cart item with the quantity of the item in the cart that we are removing  
       ...state.items,
       [action.product.id]: updatedCartItems
     }
    } else {
       const updatedCartItems = { ...state.items }; // we are creating a new cart item with the quantity of the item in the cart - 1
     delete updatedCartItems[action.pid]; // we are deleting the item from the cartItems
    }
    
 return {
  ...state,
  items: updatedCartItems,
  totalAmount: state.totalAmount - selectedCartItem.productPrice, // we are updating the total amount of the cart with the new total amount
      };
    case ADD_ORDER:
      return initialState; // we are adding the order to the cart items array and we are updating the order amount with the new order amount 
  }
  return state;
};
