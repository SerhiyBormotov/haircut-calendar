import { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Loader from "../components/Loader";
import { GlobalStyles } from "../styles/global.styles";
import { useStore } from "../store/root.store";
import { toSimpleDateString } from "../utils/date-transform";
import AuspiciousCreteriaItem from "../components/AuspiciousCreteriaItem";
import { observer } from "mobx-react-lite";
import { DaysOfWeek } from "../static-data/days-of-week";
import { ZodiacString } from "../static-data/zodiac";
import { Color } from "../styles/variables";

const DateDetails: React.FC = observer(() => {
  const { auspiciousDetails } = useStore();

  useEffect(() => {
    auspiciousDetails.getDateDetails();
  }, []);

  return (
    <View style={GlobalStyles.screenContainer}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          {toSimpleDateString(auspiciousDetails.date, true)}
        </Text>
      </View>
      {auspiciousDetails.isPending ? (
        <Loader />
      ) : (
        <>
          <View style={styles.detailsWrapper}>
            <Text style={styles.detailsText}>
              {DaysOfWeek[auspiciousDetails.date.getDay()]}
            </Text>
            <Text style={styles.detailsText}>
              Місячний день: {auspiciousDetails.moonDays.join(" - ")}
            </Text>
            <Text style={styles.detailsText}>
              Місяць у знаку:{" "}
              {auspiciousDetails.moonSigns
                .map((item) => ZodiacString[item])
                .join(" - ")}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={auspiciousDetails.criteria.slice()}
              renderItem={({ item }) => (
                <AuspiciousCreteriaItem
                  auspicious={item.auspicious}
                  title={item.title}
                  description={item.description}
                />
              )}
              keyExtractor={(item) => item.title}
            />
          </View>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  title: {
    fontFamily: "Manrope",
    color: Color.bg1,
    fontSize: 40,
    textAlign: "center",
  },
  titleWrapper: {
    ...GlobalStyles.titleWrapper,
    marginTop: 0,
  },
  detailsWrapper: {
    paddingLeft: 10,
    marginLeft: 30,
    borderLeftColor: Color.red,
    borderLeftWidth: 5,
    paddingVertical: 5,
    marginBottom: 20,
  },
  detailsText: {
    fontFamily: "Manrope",
    color: Color.dark,
    fontSize: 20,
  },
});

export default DateDetails;
