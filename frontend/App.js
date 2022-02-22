import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/reducers";
import thunk from "redux-thunk";
import firebase from "firebase/app";

const store = createStore(rootReducer, applyMiddleware(thunk));

import Constants from "expo-constants";
import AuthScreen from "./src/screens/auth";
import Route from "./src/navigation/main";
import { StatusBar } from "expo-status-bar";

// if (firebase.apps.lenght === 0) {
//   firebase.initializeApp(Constants.manifest.web.config.firebase);
// }

firebase.initializeApp({
  // firebase config
 
});

export default function App() {
  return (
    <Provider store={store}>
      <Route />
      <StatusBar style="light" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
