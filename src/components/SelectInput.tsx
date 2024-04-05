import { View, StyleSheet, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Color } from "../styles/variables";
import { Fontisto } from "@expo/vector-icons";

export interface ISelectInputProps {
  data: string[];
  onSelect: (selectedItem: string) => void;
  placeholder?: string;
  defaultValue?: string;
}
const SelectInput = ({
  data,
  onSelect,
  placeholder,
  defaultValue,
}: ISelectInputProps) => {
  return (
    <View style={styles.wrapper}>
      <SelectDropdown
        data={data}
        onSelect={onSelect}
        defaultValue={defaultValue}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {selectedItem || placeholder || ""}
              </Text>
              <Fontisto
                name={isOpened ? "angle-up" : "angle-down"}
                size={20}
                color={Color.dark}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: Color.red }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Manrope",
    color: "#000",
    textAlign: "center",
    paddingBottom: 2,
  },
  dropdownMenuStyle: {
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    color: "#000",
    fontFamily: "Manrope",
  },
});

export default SelectInput;
