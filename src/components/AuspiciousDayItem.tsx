import { View, Text, StyleSheet, Pressable } from "react-native";
import { DaysOfWeek } from "../static-data/days-of-week";
import { Color } from "../styles/variables";
import { toSimpleDateString } from "../utils/date-transform";
import { useStore } from "../store/root.store";
import { useTypedNavigation } from "../navigation/navigation.hook";

interface IAuspiciousDayItemProps {
  date: Date;
  condition?: string;
  details?: string[];
}
const AuspiciousDayItem = ({
  date,
  condition,
  details,
}: IAuspiciousDayItemProps) => {
  const navigation = useTypedNavigation();
  const { auspiciousDetails } = useStore();
  return (
    <Pressable
      onLongPress={() => {
        auspiciousDetails.setDate(date);
        navigation.navigate("DateDetails");
      }}
    >
      <View style={styles.wrapper}>
        <View style={styles.dateWrapper}>
          <Text style={styles.date}>{toSimpleDateString(date)}</Text>
          {condition && <Text style={styles.condition}>{condition}</Text>}
        </View>
        <View style={styles.detailsWrapper}>
          <Text style={styles.dayOfWeek}>{DaysOfWeek[date.getDay()]}</Text>
          {details?.map((item, index) => (
            <Text style={styles.details} key={index}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: Color.dark,
    borderBottomWidth: 0.3,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 7,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  dateWrapper: {
    flexGrow: 0,
    alignItems: "center",
  },
  detailsWrapper: {
    flex: 1,
    marginLeft: 20,
  },
  date: {
    fontSize: 30,
    color: Color.dark,
    fontFamily: "Manrope",
    fontWeight: "bold",
  },
  condition: {
    fontSize: 10,
    color: "#fff",
    backgroundColor: Color.red,
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 10,
    fontFamily: "Manrope",
    fontWeight: "bold",
  },
  dayOfWeek: {
    letterSpacing: 2,
    fontFamily: "Pacifico",
  },
  details: {
    fontSize: 12,
    color: "#000",
    fontFamily: "Manrope",
  },
});

export default AuspiciousDayItem;
