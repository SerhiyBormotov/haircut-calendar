import { View, Text, StyleSheet } from "react-native";
import { Color } from "../styles/variables";

export interface IAuspiciousCriteriaItemProps {
  auspicious: boolean;
  title: string;
  description: string;
}

const AuspiciousCreteriaItem = ({
  auspicious,
  title,
  description,
}: IAuspiciousCriteriaItemProps) => {
  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: auspicious ? Color.green : Color.red,
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 15,
  },
  title: {
    fontFamily: "Pacifico",
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: "Manrope",
  },
});
export default AuspiciousCreteriaItem;
