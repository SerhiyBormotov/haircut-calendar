import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "./RootNavigator";

export const useTypedNavigation = () => {
  const navigation = useNavigation<StackNavigation>();
  return navigation;
};
