import { ADD_ORDER, SET_ORDER } from "../actions/order";
import Order from "../../models/order";
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        orders: action.orders
      }
    case ADD_ORDER:
      const newOrder = new Order( // this is the new order object 
        action.orderData.id,
        action.orderData.items, //  this is the order object that is passed from the action creator function from the order.js file in the actions folder
        action.orderData.amount, // this is the order object that is passed from the action creator function from the order.js file in the actions folder
        action.orderData.date, // this is the order object that is passed from the action creator function from the order.js file in the actions folder    );
      )
  return { 
        ...state, 
        order: state.orders.concat(newOrder), // this is the new order object that is added to the orders array in the state object from the initialState object 
      }; 
  }
};
