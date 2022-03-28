import { ADD_ORDER } from "../actions/order";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order( // this is the new order object 
        new Date().toString(), 
        action.orderData.items, //  this is the order object that is passed from the action creator function from the order.js file in the actions folder
        action.orderData.amount, // this is the order object that is passed from the action creator function from the order.js file in the actions folder
        new Date()
      );
      return { 
        ...state, 
        order: state.orders.concat(newOrder), // this is the new order object that is added to the orders array in the state object from the initialState object 
      }; 
  }
};
