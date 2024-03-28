import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { IRootStore, Provider, setupStore } from "./src/store/root.store";
import RootNavigator from "./src/navigation/RootNavigator";
import { useFonts } from "expo-font";
import LoadingScreen from "./src/components/Loading";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Pacifico: require("./src/assets/fonts/Pacifico.ttf"),
    Manrope: require("./src/assets/fonts/Manrope.ttf"),
  });

  const [store, setStore] = useState<IRootStore>(null);

  useEffect(() => {
    setupStore().then((res) => {
      setStore(res);
    });
  }, []);

  if ((!fontsLoaded && !fontError) || !store) {
    return <LoadingScreen />;
  }

  return (
    <Provider value={store}>
      <RootNavigator />
    </Provider>
  );
}
