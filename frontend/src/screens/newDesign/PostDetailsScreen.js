import * as React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Video } from "expo-av";

export default function PostDetailsScreen({ route }) {
  const navigation = useNavigation();
  const { videoURLFirebase } = route.params;
  const { imageAssetURLFirebase } = route.params;
  const { postDescription } = route.params;

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

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
        <TouchableOpacity style={styles.socialButtons}>
          <Feather name="heart" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButtons}>
          <Feather name="send" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButtons}>
          <Image
            style={styles.userAvatarImage}
            source={{ uri: imageAssetURLFirebase }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}> "{postDescription}"</Text>
      </View>
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
    top: 60,
    right: 20,
  },

  playPause: {
    marginBottom: 90,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  socialButtons: {
    marginLeft: 10,
    marginBottom: 40,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 530,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  content: {
    position: "absolute",
    bottom: 80,
    width: 240,
    marginLeft: 20,
    // backgroundColor: "rgba(0, 0, 0, 0.2)",
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
    width: 70,
    height: 70,
    borderRadius: 35,
    // borderColor: "white",
    // borderStyle: "solid",
    // borderWidth: 2,
  },
});
