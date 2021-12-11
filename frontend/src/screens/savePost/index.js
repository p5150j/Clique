import React from "react";
import { View, Text, TextInput, Image } from "react-native";
import styles from "./styles";

export default function SavePostScreen(props) {
  //   console.log(props.route.params.source);
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
        <Image
          style={styles.mediaPreview}
          source={{ uri: props.route.params.source }}
        />
      </View>
    </View>
  );
}
