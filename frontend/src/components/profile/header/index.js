import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import styles from "./styles";
import { buttonStyles } from "../../../styles";

export default function ProfileHeader({ user }) {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.userImage}
        source={{ uri: auth.currentUser.photoURL }}
      />
      <Text style={styles.emailText}>{user.email}</Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      <TouchableOpacity
        style={buttonStyles.grayOutlinedButton}
        onPress={() => navigation.navigate("editProfile")}
      >
        <Text style={{ color: "white" }}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
