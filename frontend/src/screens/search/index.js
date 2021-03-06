import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchUserItem from "../../components/search/userItem";
import { queryUsersByEmail } from "../../services/user";
import styles from "./styles";

export default function SearchScreen({ item }) {
  const [textInput, setTextInput] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  useEffect(() => {
    queryUsersByEmail(textInput).then(setSearchUsers);
  }, [textInput]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setTextInput}
        style={styles.textInput}
        placeholder={"Search..."}
        placeholderTextColor="white"
      />
      <FlatList
        style={styles.list}
        data={searchUsers}
        renderItem={SearchUserItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
