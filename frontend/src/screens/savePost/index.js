import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions";

export default function SavePostScreen(props) {
  const auth = useSelector((state) => state.auth);

  // console.log(
  //   "currect user url is ///////////////== " + auth.currentUser.photoURL
  // );

  const [description, setDescription] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState(auth.currentUser.photoURL);
  const [userName, setUserName] = useState(auth.currentUser.displayName);

  // console.log("currect user url is ///////////////== " + userName);

  const [requestRunning, setRequestRunning] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSavePost = () => {
    setRequestRunning(true);
    dispatch(
      createPost(
        description,
        userPhotoURL,
        userName,
        props.route.params.source,
        props.route.params.sourceThumb
      )
    )
      .then(() => navigation.dispatch(StackActions.popToTop()))
      .catch(() => setRequestRunning(false));
  };

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="red" size="large" />
        <Text
          style={{
            position: "absolute",
            bottom: 100,
            // width: 350,
            fontSize: 30,
            paddingLeft: 30,
            paddingRight: 20,
            color: "rgba(0, 0, 0, 0.2)",
          }}
        >
          Robots are compessing your video for optumum quality and maxumum
          lovablity...please dont close the app
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputText}
          maxLength={150}
          multiline
          onChangeText={(text) => setDescription(text)}
          placeholder="Describe your video"
        />

        <TextInput
          hidden
          multiline
          onChangeText={(text) => ssetUserPhotoURL(text)}
        />

        <Image
          style={styles.mediaPreview}
          source={{ uri: props.route.params.sourceThumb }}
        />
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.spacer} />
      </TouchableWithoutFeedback>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSavePost()}
          style={styles.postButton}
        >
          <Feather name="corner-left-up" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
