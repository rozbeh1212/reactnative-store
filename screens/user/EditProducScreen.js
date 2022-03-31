import React, { useEffect, useCallback, useReducer } from "react";
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

const REDUCER_UPDATE = "UPDATE"; 

const formReducer = (state, action) => { // formReducer is a reducer function that is called when the user changes the text in the text input or when the user presses the save button
  if (action.type === "UPDATE") {   // if the action is of type update, then we update the state with the new value of the text input
    const updatedValues = {
      ...state.inputValues,   // we create a new object with the old inputValues object 
      [action.input]: action.value, // and we update the value of the text input with the new value
    };
    const updatedValidities = { // this is the same as the inputValues object, but we update the validities of the text inputs 
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true; // we create a new variable that is true by default, and if any of the text inputs are invalid, then we set this variable to false
    for (const key in updatedValidities) { // we loop through the updatedValidities object and check if any of the text inputs are invalid or not valid 
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
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, { // we use useReducer to update the state of the form  (the state of the text inputs) 
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

  const submitHandler = useCallback(() => {
    // submitHandler is a callback function that is called when the user presses the save button  (the save button is set to the onPress property of the save button in the navigationOptions)
    if (!formState.formIsValid.title) {
      Alert.alert("Invalid input", "Please check your input", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        // dispatch the editProduct action with the editedProduct as the argument  (the editProduct action is defined in the productsActions file)
        productsActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
    // dispatch the createProduct action with the title, description, imageUrl, and price as the arguments (the createProduct action is defined in the productsActions file)
  }, [dispatch, prodId, formState]); // useCallback is used to memoize the submitHandler function so that it does not re-render every time the submitHandler function is called
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  const titleChangeHandler = (inputIdentfier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: REDUCER_UPDATE,
      input: "title",
      value: text,
      isValid: isValid,
      input: inputIdentfier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChangeText={titleChangeHandler.bind(this, "title")} // onchangeText is a callback function that is called when the user changes the text in the text input
            keyboardType='decimal-pad' // decimal-pad is a keyboard type that allows the user to enter decimal numbers
            autoCapitalize='sentences' // sentences is a capitalization type that allows the user to enter sentences
            returnKeyType='next' // returnKeyType is a keyboard type that allows the user to press the next button to move to the next input
          />
          {!formState.inputValidities.title && (
            <Text style={styles.error}>Please enter a valid URL</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            // onChangeText={(text) => setImageUrl(text)}
            onChangeText={titleChangeHandler.bind(this, "imageUrl")}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChangeText={titleChangeHandler.bind(this, "price")}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={titleChangeHandler.bind(this, "description")}
          />
        </View>
      </View>
    </ScrollView>
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
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
