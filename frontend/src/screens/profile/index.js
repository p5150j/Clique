import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import ProfileHeader from "../../components/profile/header";
import ProfileNavBar from "../../components/profile/navBar";
import ProfilePostList from "../../components/profile/postList";
import styles from "./styles";

export default function ProfileScreen() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserPosts = useSelector((state) => state.posts.currentUserPosts);

  return (
    <View style={styles.container}>
      <ProfileNavBar user={currentUser} />
      <ProfileHeader user={currentUser} />
      <ProfilePostList posts={currentUserPosts} />

      <ScrollView></ScrollView>
    </View>
  );
}
