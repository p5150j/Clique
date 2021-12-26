import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 65,
    borderBottomWidth: 1,
    borderColor: "#484848",
    color: "white",
  },
  counterContainer: {
    paddingBottom: 20,
    flexDirection: "row",
  },
  counterItemContainer: {
    flex: 1,
    alignItems: "center",
  },
  emailText: {
    padding: 20,
    color: "white",
  },
  counterNumberText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  counterLabelText: {
    color: "white",
    fontSize: 11,
  },

  userImage: {
    height: 100,
    width: 100,
    // position: "absolute",
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
