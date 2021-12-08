import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";

export default function AuthMenu() {
  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <Text style={styles.headerText}>Login</Text>
        <TouchableOpacity style={styles.providerButton}>
          <Feather name="user" size={24} color="black" />
          <Text>Use Email</Text>
          <View />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.providerButtonBottom}>
        <Text>
          Dont have an account?
          <Text style={styles.signup}> Sign up!</Text>
        </Text>
        <View />
      </TouchableOpacity>
    </View>
  );
}
