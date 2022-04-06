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
    throw new Error ("Something went wrong!");
   }
   const resData = await response.json(); // this is the response from the server if the response is successful
    dispatch({ type: SIGNUP });
  };
};


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
      throw new Error("Something went wrong!");
    }
    const resData = await response.json(); // this is the response from the server if the response is successful
    dispatch({ type: LOGIN });
  };
};