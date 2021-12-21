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
    <ContainerView>
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
                    postDescription: item.description,
                  });
                }}
              >
                <Card
                  postImage={{ uri: item.media[1] }}
                  title={item.description}
                  //need to update this when I figure out how to get the user image
                  avatarImage={{ uri: item.media[1] }}
                  userName={item.creator}
                />
              </TouchableOpacity>
            </>
          ))}
        </ScrollView>
        <CardHeader>The 2nd feed</CardHeader>
      </ScrollView>
    </ContainerView>
  );
}

const ContainerView = styled.View`
  flex: 1;
  background-color: black;
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
