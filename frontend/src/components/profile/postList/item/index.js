import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
export default function ProfilePostListItem({ item }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.image}
        onPress={() => {
          navigation.navigate("postDetails", {
            videoURLFirebase: item.media[0],
            imageAssetURLFirebase: item.media[1],
            userPhotoURL: item.userPhotoURL,
            postDescription: item.description,
            postLikesCount: item.likesCount,
            userName: item.userName,
            postID: item.id,
          });
        }}
      >
        <Image style={styles.image} source={{ uri: item.media[1] }} />
      </TouchableOpacity>
    </View>
  );
}
