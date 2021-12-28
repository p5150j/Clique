import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Image,
  Text,
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

///this is the POC for likes ======================================================
import { getLikeById, updateLike } from "../../services/posts";
import { throttle } from "throttle-debounce";
import { useDispatch, useSelector } from "react-redux";
/// end poc likes ======================================================

export default function PostDetailsScreen({ route, post, user }) {
  const navigation = useNavigation();
  const { videoURLFirebase } = route.params;
  const { imageAssetURLFirebase } = route.params;
  const { postDescription } = route.params;
  const { userPhotoURL } = route.params;

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  ///this is the POC for likes ======================================================
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
  /// end poc likes ======================================================

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

        <TouchableOpacity style={styles.socialButtons}>
          <Ionicons color={"white"} size={30} name="chatbubble" />
          <View style={styles.countBubble}>
            <Text style={styles.countText}>66</Text>
          </View>
        </TouchableOpacity>

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
            onPress={() => Vibration.vibrate()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}> {postDescription}</Text>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    top: 80,
    left: 20,
    position: "absolute",
  },
  buttonRow: {
    position: "absolute",
    bottom: 80,
    right: 20,
  },

  playPause: {
    marginBottom: 40,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  socialButtons: {
    marginLeft: 10,
    marginBottom: 40,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  socialAlertButtons: {
    marginLeft: 15,
    marginBottom: 40,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  content: {
    position: "absolute",
    bottom: 80,
    width: 240,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    // color: "white",
    color: "rgba(255,255,255, 0.9)",
    fontSize: 33,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.44)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontStyle: "italic",
  },

  userAvatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 2,
  },

  countBubble: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    top: 52,
    position: "absolute",
  },

  countText: {
    color: "red",
    fontWeight: "600",
    fontSize: 11,
    textAlign: "center",
    fontWeight: "bold",
    padding: 4,
  },
});
