import { Pressable, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const Header = ({ style }) => {
  return (
    <View style={style}>
      <Pressable>
        <SimpleLineIcons name="menu" size={30} color="white" />
      </Pressable>
    </View>
  );
};

export default Header;
