export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN"
export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCLR8fJfYcvl73Tw9ZVCsecUTU6Mn5L7zs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      }
      throw new Error(message);
    }
    const resData = await response.json(); // this is the response from the server if the response is successful
    dispatch({ type: SIGNUP, token: resData.idToken , userId: resData.localId});//  we dispatch the action to the reducer this for the user to be signed up and the token and userId are passed to the reducer 

}
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLR8fJfYcvl73Tw9ZVCsecUTU6Mn5L7zs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

     if (!response.ok) {
       const errorResData = await response.json();
       const errorId = errorResData.error.message;
       let message = "Something went wrong!";
       if (errorId === "EMAIL_NOT_FOUND") {
         message = "This email exists already!";
       }
       throw new Error(message);
     }
    const resData = await response.json(); // this is the response from the server if the response is successful
    dispatch({ type: LOGIN , token: resData.idToken , userId: resData.localId}); // we dispatch the action to the reducer to update the state of the application (the state of the token and the userId) this is for the user to be able to log in to the application (the user is able to log in to the application by entering his email and password) 
  };
};