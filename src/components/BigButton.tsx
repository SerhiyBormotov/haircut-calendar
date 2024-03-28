import { Pressable, StyleSheet, Text, View } from "react-native";
import { Color } from "../styles/variables";

interface IBigButtonProps {
  text: string;
  onPress: () => void;
}

const BigButton = ({ text, onPress }: IBigButtonProps) => {
  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? Color.darkred : Color.red },
          styles.button,
        ]}
        onPress={onPress}
        android_ripple={{ color: Color.bg2 }}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  button: {
    width: 200,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { height: 4, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.9,
    elevation: 5,
  },
  text: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    color: "#fff",
  },
});

export default BigButton;
