import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import DateDetails from "../screens/DateDetails";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import InitialScreen from "../screens/Initial";
import HomeNavigator from "./HomeNavigator";

export type ScreenNames = [
  "HomeNavigator",
  "Home",
  "DateDetails",
  "Initial",
  "Settings",
];
export type RootStackParamList = Record<
  ScreenNames[number],
  Record<string, unknown>
>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = observer(() => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DateDetails"
          component={DateDetails}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default RootNavigator;
