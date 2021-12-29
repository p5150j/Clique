import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import firebase from "firebase";

export default function ProfileNavBar({ user }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="search" size={20} color={"white"} />
      </TouchableOpacity>
      <Text style={styles.text}>{user.displayName}</Text>
      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut();
        }}
      >
        <Feather name="power" size={24} color={"white"} />
      </TouchableOpacity>
    </View>
  );
}
