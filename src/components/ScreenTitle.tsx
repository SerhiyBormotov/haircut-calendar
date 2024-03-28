import { View, Text } from "react-native";
import { GlobalStyles } from "../styles/global.styles";

interface IScreenTitleProps {
  title: string;
}
const ScreenTitle = ({ title }: IScreenTitleProps) => {
  return (
    <View style={GlobalStyles.titleWrapper}>
      <Text style={GlobalStyles.titleText}>{title}</Text>
    </View>
  );
};

export default ScreenTitle;
