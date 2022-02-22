import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Vibration,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { BottomSheet } from "react-native-btr";
import styles from "./styles";
import { getLikeById, updateLike } from "../../services/posts";
import { throttle } from "throttle-debounce";
import { useDispatch, useSelector } from "react-redux";
import Constants from 'expo-constants';
import * as MailComposer from 'expo-mail-composer';



export default function PostDetailsScreen({ route, post, user }) {
  const navigation = useNavigation();
  const { videoURLFirebase } = route.params;
  const { imageAssetURLFirebase } = route.params;
  const { postDescription } = route.params;
  const { userPhotoURL } = route.params;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { postLikesCount } = route.params;
  const { postID } = route.params;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: postLikesCount,
  });

  useEffect(() => {
    getLikeById(postID, currentUser.uid).then((res) => {
      setCurrentLikeState({
        ...currentLikeState,
        state: res,
      });
    });
  }, []);

  const handleUpdateLike = useMemo(
    () =>
      throttle(500, true, (currentLikeStateInst) => {
        setCurrentLikeState({
          state: !currentLikeStateInst.state,
          counter:
            currentLikeStateInst.counter +
            (currentLikeStateInst.state ? -1 : 1),
        });
        updateLike(postID, currentUser.uid, currentLikeStateInst.state);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }),
    []
  );
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom comments sheet
    setVisible(!visible);
  };



async function sendEmailAsync() {
  let result = await MailComposer.composeAsync({
    recipients: ['patrick.ortell@arus.io'],
    subject: 'Flagging this content!!!!',
    body: 'This post is offensive content, is defamatory, obscene, pornographic, gratuitously violent or otherwise offensive has an ID of ' + postID,
  });

  alert(result.status);
}


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: videoURLFirebase,
          }}
          resizeMode={Video.RESIZE_MODE_COVER}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          usePoster
          posterSource={{ uri: imageAssetURLFirebase }}
          posterStyle={{ resizeMode: "cover", height: "100%" }}
        />
        <View style={styles.buttons}></View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Feather name="arrow-left" size={36} color="white" />
      </TouchableOpacity>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.playPause}>
          <Feather
            name={status.isPlaying ? "pause" : "play"}
            size={36}
            color="white"
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButtons}
          onPress={() => handleUpdateLike(currentLikeState)}
        >
          <Ionicons
            color={currentLikeState.state ? "red" : "white"}
            size={30}
            name={currentLikeState.state ? "heart" : "heart-outline"}
          />

          <View style={styles.countBubble}>
            <Text style={styles.countText}>{currentLikeState.counter}</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.socialButtons}>
          <Ionicons
            color={"white"}
            size={30}
            name="chatbubble"
            onPress={toggleBottomNavigationView}
          />
          <View style={styles.countBubble}>
            <Text style={styles.countText}>66</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.socialButtons}>
          <Image
            style={styles.userAvatarImage}
            source={{ uri: userPhotoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialAlertButtons}>
          <Feather
            name="alert-circle"
            size={18}
            color="white"
            // onPress={() => Vibration.vibrate()}
            // onPress={toggleBottomNavigationView}
            onPress={sendEmailAsync}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}> {postDescription}</Text>
      </View>
      <StatusBar style="dark" />

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={toggleBottomNavigationView}
        //Toggling the visibility state on the clicking out side of the sheet
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={styles.textInput}
              placeholder={"comment on this post..."}
              placeholderTextColor="lightgray"
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}
