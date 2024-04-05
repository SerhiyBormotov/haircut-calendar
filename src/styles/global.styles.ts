import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  titleWrapper: {
    justifyContent: "flex-end",
    marginTop: 60,
    width: "100%",
    padding: 20,
  },
  titleText: {
    fontSize: 26,
    textAlign: "center",
    color: "#fff",
    fontFamily: "Pacifico",
    textShadowColor: "#00000055",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 5,
  },
});
