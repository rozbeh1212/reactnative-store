import { AUTHENTICATE } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
   case AUTHENTICATE:
    return {
     token: action.token, // this is the token that is returned from the server when the user logs in to the application 
     userId: action.userId, // this is the userId that is returned from the server when the user logs in to the application
    };
  //  case SIGNUP:
  //   return {
  //    token: action.token, // this is the token that is returned from the server when the user try to sign up to the application  
  //    userId: action.userId, // this is the userId that is returned from the server when the user try to sign up to the application
  //   };
    default:
      return state;
  }
};
