import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";

const CardLarge = (props) => (
  <ContainerLarge>
    <ImageLarge source={props.postImage} />
    <Title>{props.title}</Title>
    <ContentLarge>
      <UserPic source={props.avatarImage} />
      <LikeBtn>{props.userName}</LikeBtn>
    </ContentLarge>
  </ContainerLarge>
);

export default CardLarge;

const ContainerLarge = styled.View`
  width: 330px
  height: 400px;
  background-color: white;
  border-radius: 14px;
  box-shadow: 0px 5px 15px rgba(0,0,0, 0.15);
  margin: auto;

  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

const ImageLarge = styled.Image`
 width: 330px
  height: 400px;
  border-radius: 14px;
`;

const ContentLarge = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  position: absolute;
  font-weight: bold;
  font-size: 24px;
  margin-top: 20px;
  margin-left: 20px;
`;

const UserPic = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-right: 10px;
`;

const LikeBtn = styled.Text`
  max-width: 150px;
  margin-top: 10px;
  color: white;
  font-weight: 300;
  font-size: 18px;
`;
