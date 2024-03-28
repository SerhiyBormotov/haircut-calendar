import { Image, StyleSheet, View } from "react-native";
import Loader from "./Loader";
import ScreenBgContainer from "./ScreenContainer";

const LoadingScreen = () => {
  return (
    <ScreenBgContainer>
      <View style={styles.wrapper}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <View style={styles.loaderWrapper}>
          <Loader />
        </View>
      </View>
    </ScreenBgContainer>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderWrapper: {
    height: 150,
  },
});

export default LoadingScreen;
