import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const Card = (props) => (
  <Container>
    <Image source={props.postImage} />
    <Title></Title>

    <Content>
      <UserPic source={props.avatarImage} />
      <LikeBtn>{props.userName}</LikeBtn>
    </Content>
  </Container>
);

export default Card;

const Container = styled.View`
  width: 200px
  height: 350px;
  background-color: white;
  border-radius: 14px;
  box-shadow: 0px 5px 15px rgba(0,0,0, 0.15);
  margin-left: 20px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
 width: 200px
  height: 350px;
  border-radius: 14px;
`;

const Title = styled.Text`
  color: white;
  position: absolute;
  font-weight: bold;
  font-size: 24px;
  margin-top: 20px;
  margin-left: 20px;
`;

const Content = styled.View`
  position: absolute;
  bottom: 20px;
  left: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserPic = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-right: 10px;
  /* border: 1px solid white; */
`;

const LikeBtn = styled.Text`
  max-width: 100px;
  margin-top: 10px;
  color: white;
  font-weight: 300;
  font-size: 18px;
`;
