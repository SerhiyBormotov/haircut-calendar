import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Color } from "../styles/variables";

const Loader = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={Color.red} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 100,
    justifyContent: "center",
  },
});

export default Loader;
