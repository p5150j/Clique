import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import Card from "./Card";
import CardLarge from "./CardLarge";
import { getFeed } from "../../services/posts";

export default function NewHomeFeed({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getFeed().then(setPosts);
  }, []);

  return (
    <ContainerView
      style={{
        paddingTop: 50,
      }}
    >
      <ScrollView>
        <CardHeader>The first feed</CardHeader>
        <ScrollView
          horizontal={true}
          style={{
            paddingBottom: 30,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {posts.map((item, index) => (
            <>
              <TouchableOpacity
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
                <Card
                  postImage={{ uri: item.media[1] }}
                  title={item.description}
                  //need to update this when I figure out how to get the user image photoURL
                  avatarImage={{ uri: item.userPhotoURL }}
                  userName={item.userName}
                />
              </TouchableOpacity>
            </>
          ))}
        </ScrollView>
        <CardHeader>The 2nd feed</CardHeader>

        {posts.map((item, index) => (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("postDetails", {
                  videoURLFirebase: item.media[0],
                  imageAssetURLFirebase: item.media[1],
                  userPhotoURL: item.userPhotoURL,
                  postDescription: item.description,
                });
              }}
            >
              <CardLarge
                postImage={{ uri: item.media[1] }}
                title={item.description}
                //need to update this when I figure out how to get the user image photoURL
                avatarImage={{ uri: item.userPhotoURL }}
                userName={item.userName}
              />
            </TouchableOpacity>
          </>
        ))}
      </ScrollView>
    </ContainerView>
  );
}

const ContainerView = styled.View`
  flex: 1;
  background-color: "rgba(0,0,0, 1)";
  justify-content: center;
  align-items: center;
`;

const CardHeader = styled.Text`
  margin-left: 20px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: white;
`;
