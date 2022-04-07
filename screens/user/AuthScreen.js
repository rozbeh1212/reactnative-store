//import liraries
import React, { useEffect, useState, useReducer, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
// formReducer is a reducer function that is called when the user changes the text in the text input or when the user presses the save button
const formReducer = (state, action) => {
  if (action.type === "UPDATE") {
    // if the action is of type update, then we update the state with the new value of the text input
    const updatedValues = {
      ...state.inputValues, // we create a new object with the old inputValues object
      [action.input]: action.value, // and we update the value of the text input with the new value
    };
    const updatedValidities = {
      ...state.inputValidities, // this is the same as the inputValues object, but we update the validities of the text inputs
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true; // we create a new variable that is true by default, and if any of the text inputs are invalid, then we set this variable to false
    for (const key in updatedValidities) {
      // we loop through the updatedValidities object and check if any of the text inputs are invalid or not valid
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]; // we check  if the current text input is valid or not valid and if it is not valid, then we set the updatedFormIsValid to false
    }
    return {
      formIsValid: updatedFormIsValid, // we return the new state of the formIsValid variable  (true or false)
      inputValidities: updatedValidities, // we return the new state of the inputValidities object  (true or false)
      inputValues: updatedValues, // we return the new state of the inputValues object  (the value of the text input that the user has entered in the text input field  )
    };
  }
  return state;
};

// create a component
const AuthScreen = () => {
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignUp] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    // we use useReducer to update the state of the form  (the state of the text inputs)
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false, // if the user is editing a product, then we set the value of the formIsValid variable to true (if the user is adding a product, then we set the value of the formIsValid variable to false)
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = dispatch(
        authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password
        )
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Shop"); // we navigate to the shop screen after the user has successfully logged in
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    dispatch(action)
  );

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card styles={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='Email'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email address'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a valid  password'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <View style={styles.buttonContainer}>
              {isloading ? (
                <ActivityIndicator size='small' color='orange' />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color='#29aaf4'
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color='#29aaf4'
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

// define your styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
