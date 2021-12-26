import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";

export default function ProfileNavBar({ user }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="search" size={20} color={"white"} />
      </TouchableOpacity>
      <Text style={styles.text}>{user.displayName}</Text>
      <TouchableOpacity>
        <Feather name="menu" size={24} color={"white"} />
      </TouchableOpacity>
    </View>
  );
}
