import React, { useCallback, useEffect, useState } from "react";
import "react-native-gesture-handler";
import { IRootStore, Provider, setupStore } from "./src/store/root.store";
import RootNavigator from "./src/navigation/RootNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

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

  const onAppReady = useCallback(async () => {
    if (fontsLoaded && store) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, store]);

  if ((!fontsLoaded && !fontError) || !store) {
    return null;
  }

  return (
    <View onLayout={onAppReady} style={{ flex: 1 }}>
      <Provider value={store}>
        <RootNavigator />
      </Provider>
    </View>
  );
}
