import { ScrollView, StyleSheet, Text } from "react-native";
import ScreenBgContainer from "../components/ScreenContainer";
import ScreenTitle from "../components/ScreenTitle";
import { LOCATIONS } from "../static-data/locations";
import SelectInput from "../components/SelectInput";
import BigButton from "../components/BigButton";
import { ISettings } from "../store/settings.store";
import { useState } from "react";
import { useStore } from "../store/root.store";
import { getLocationByCity } from "../utils/location-utils";
import { observer } from "mobx-react-lite";
import { useTypedNavigation } from "../navigation/navigation.hook";

const SettingsScreen = observer(() => {
  const [data, setData] = useState<ISettings>(null);
  const { settings } = useStore();
  const navigation = useTypedNavigation();

  const onSubmit = () => {
    if (data) {
      settings.update(data);
      navigation.navigate("Home");
    }
  };

  return (
    <ScreenBgContainer>
      <ScreenTitle title="Налаштування" />
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.label}>Поточна локація:</Text>
        <SelectInput
          data={LOCATIONS.map((item) => item.city)}
          defaultValue={settings.city}
          onSelect={(value) => {
            setData((data) => ({
              ...data,
              city: value,
              location: getLocationByCity(value),
            }));
          }}
        />
        <BigButton text="Зберегти" onPress={onSubmit} />
      </ScrollView>
    </ScreenBgContainer>
  );
});

const styles = StyleSheet.create({
  label: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Manrope",
    color: "#fff",
  },
});

export default SettingsScreen;
