import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    marginTop: 50,
    flex: 1,
    padding: 30,
  },

  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 25,
    color: "darkslategrey",
    textAlign: "center",
  },

  providerButton: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  providerButtonBottom: {
    paddingBottom: 50,
    backgroundColor: "ghostwhite",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    alignItems: "center",
    borderStartColor: "lightgray",
    borderStyle: "solid",
    borderWidth: 1,
  },
  signup: {
    fontWeight: "bold",
  },
});

export default styles;
