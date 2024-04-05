import { useState } from "react";
import BigButton from "../components/BigButton";
import ScreenBgContainer from "../components/ScreenContainer";
import ScreenTitle from "../components/ScreenTitle";
import SelectInput from "../components/SelectInput";
import { LOCATIONS } from "../static-data/locations";
import { useTypedNavigation } from "../navigation/navigation.hook";
import { useStore } from "../store/root.store";
import { getLocationByCity } from "../utils/location-utils";

const InitialScreen = () => {
  const [currentCity, setCurrentCity] = useState<string>();
  const navigation = useTypedNavigation();
  const { settings } = useStore();

  const onSelect = (selectedItem: string) => {
    setCurrentCity(selectedItem);
  };

  const onSubmit = () => {
    const data = {
      city: currentCity,
      location: getLocationByCity(currentCity),
    };

    settings.update(data);

    navigation.navigate("Home");
  };

  return (
    <ScreenBgContainer>
      <ScreenTitle title="Вітаю, виберіть, будь ласка, найближче до Вас місто зі списку:" />
      <SelectInput
        data={LOCATIONS.map((item) => item.city)}
        onSelect={onSelect}
        placeholder="Оберіть місто"
      />
      {currentCity && <BigButton text="ОК" onPress={onSubmit} />}
    </ScreenBgContainer>
  );
};

export default InitialScreen;
