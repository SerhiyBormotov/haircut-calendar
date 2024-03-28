import { createDrawerNavigator } from "@react-navigation/drawer";
import { observer } from "mobx-react-lite";
import Home from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import { Color } from "../styles/variables";

const Drawer = createDrawerNavigator();

const HomeNavigator = observer(() => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTintColor: "white",
        headerTitle: () => "",
        drawerActiveBackgroundColor: Color.red,
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: Color.dark,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ title: "Головна" }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Налаштування" }}
      />
    </Drawer.Navigator>
  );
});

export default HomeNavigator;
