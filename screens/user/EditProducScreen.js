import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import * as productsActions from "../../store/actions/products";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import { async } from "validate.js";
import { KeyboardAvoidingView } from "react-native-web";

const REDUCER_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  // formReducer is a reducer function that is called when the user changes the text in the text input or when the user presses the save button
  if (action.type === "UPDATE") {
    // if the action is of type update, then we update the state with the new value of the text input
    const updatedValues = {
      ...state.inputValues, // we create a new object with the old inputValues object
      [action.input]: action.value, // and we update the value of the text input with the new value
    };
    const updatedValidities = {
      // this is the same as the inputValues object, but we update the validities of the text inputs
      ...state.inputValidities,
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

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    // we use useReducer to update the state of the form  (the state of the text inputs)
    inputValues: {
      title: editedProduct ? editedProduct.title : "", // if the user is editing a product, then we set the value of the title text input to the title of the product that the user is editing  (if the user is adding a product, then we set the value of the title text input to an empty string)
      imageUrl: editedProduct ? editedProduct.imageUrl : "", // if the user is editing a product, then we set the value of the imageUrl text input to the imageUrl of the product that the user is editing  (if the user is adding a product, then we set the value of the imageUrl text input to an empty string)
      description: editedProduct ? editedProduct.description : "", // if the user is editing a product, then we set the value of the description text input to the description of the product that the user is editing  (if the user is adding a product, then we set the value of the description text input to an empty string)
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false, // if the user is editing a product, then we set the value of the title text input to true (if the user is adding a product, then we set the value of the title text input to false)
      imageUrl: editedProduct ? true : false, // if the user is editing a product, then we set the value of the imageUrl text input to true (if the user is adding a product, then we set the value of the imageUrl text input to false)
      description: editedProduct ? true : false, // if the user is editing a product, then we set the value of the description text input to true (if the user is adding a product, then we set the value of the description text input to false)
      price: editedProduct ? true : false, // if the user is editing a product, then we set the value of the price text input to true (if the user is adding a product, then we set the value of the price text input to false)
    },
    formIsValid: editedProduct ? true : false, // if the user is editing a product, then we set the value of the formIsValid variable to true (if the user is adding a product, then we set the value of the formIsValid variable to false)
  });

  useEffect(() => { // if the user is editing a product and when when get error from the server, then we set the error state to the error message that the server sent user
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => { 
    // submitHandler is a callback function that is called when the user presses the save button  (the save button is set to the onPress property of the save button in the navigationOptions)
    if (!formState.formIsValid.title) {
      Alert.alert("Invalid input", "Please check your input", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);

    try { // if the user is editing a product, then we update the product on the server 
      if (editedProduct) { 
        await dispatch( 
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else { // if the user is adding a product, then we add the product on the server and update the product on the server again
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack(); // we navigate back to the previous screen
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false); // we set the isLoading state to false after the product has been added or updated to the server.
    // dispatch the createProduct action with the title, description, imageUrl, and price as the arguments (the createProduct action is defined in the productsActions file)
  }, [dispatch, prodId, formState]); // useCallback is used to memoize the submitHandler function so that it does not re-render every time the submitHandler function is called

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  /* inputChangeHandler is a callback function that is called when the user changes the text in the text input 
   useCallback is used to memoize the inputChangeHandler function so that it does not re-render every time the inputChangeHandler function is called */
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) { // if the isLoading variable is true, then we return a loading indicator 
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorText='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id='imageUrl'
            label='Image Url'
            errorText='Please enter a valid image url!'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid description!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
