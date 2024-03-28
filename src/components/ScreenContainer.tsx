import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../styles/global.styles";
import { Color } from "../styles/variables";

const ScreenBgContainer = ({ children }) => {
  return (
    <LinearGradient
      colors={[Color.bg1, Color.bg2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.2 }}
      style={GlobalStyles.screenContainer}
    >
      {children}
    </LinearGradient>
  );
};

export default ScreenBgContainer;
