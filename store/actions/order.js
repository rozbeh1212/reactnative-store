export const ADD_ORDER = "ADD_ORDER"; // this is the action type 

export const addOrder = (carrItems, totalAmount) => { // this is the action creator function 
  return {
    type: ADD_ORDER, // this is the action type for the action creator 
   orderData: {  
    items: carrItems, 
    amount: totalAmount, 
   }
  };
}