import { StyleSheet, Dimensions, Platform } from "react-native";

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
    color: "rgba(255,255,255, 0.9)",
    fontSize: 33,
    fontWeight: "600",
    textShadowRadius: 10,
    fontStyle: "italic",
  },

  userAvatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "white",
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

  bottomNavigationView: {
    // backgroundColor: "#000",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: "100%",
    height: Dimensions.get("window").height - 200,
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 20,
  },

  textInput: {
    margin: 10,
    // backgroundColor: "#232323",
    // padding: 8,
    // borderRadius: 4,
    borderColor: "#484848",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    fontSize: 16,
  },
});

export default styles;
