import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/actions";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth";
import HomeScreen from "../home";
import SavePostScreen from "../../screens/savePost";
import EditProfileScreen from "../../screens/profile/edit";
import EditProfileFieldScreen from "../../screens/profile/edit/field";
import PostDetailsScreen from "../../screens/newDesign/PostDetailsScreen";

const Stack = createNativeStackNavigator();

export default function Route() {
  const currentUserObj = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);
  // console.log(currentUserObj);

  if (!currentUserObj.loaded) {
    return <View></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUserObj.currentUser == null ? (
          <Stack.Screen
            name="auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="nope"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="savePost"
              component={SavePostScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="editProfile"
              component={EditProfileScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="editProfileField"
              component={EditProfileFieldScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="postDetails"
              component={PostDetailsScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
