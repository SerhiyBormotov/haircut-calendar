import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import AuspiciousDayItem from "../components/AuspiciousDayItem";
import Loader from "../components/Loader";
import { useStore } from "../store/root.store";
import ScreenBgContainer from "../components/ScreenContainer";
import ScreenTitle from "../components/ScreenTitle";
import { useTypedNavigation } from "../navigation/navigation.hook";

const Home = observer(() => {
  const { auspiciousDaysList, settings } = useStore();
  const navigation = useTypedNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    auspiciousDaysList.getNextMonthList().then(() => {
      setRefreshing(false);
    });
  };

  useEffect(() => {
    if (!settings.city) {
      navigation.navigate("Initial");
    } else {
      auspiciousDaysList.getNextMonthList();
    }
  }, [settings.city]);

  return (
    <ScreenBgContainer>
      <ScreenTitle title="Найближчі сприятливі для стрижки дні:" />

      {auspiciousDaysList.isPending ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={auspiciousDaysList.list.slice()}
            renderItem={({ item }) => (
              <AuspiciousDayItem
                date={item.date}
                condition={item.condition}
                details={item.details}
              />
            )}
            keyExtractor={(item) => item.date.toISOString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </ScreenBgContainer>
  );
});

export default Home;
