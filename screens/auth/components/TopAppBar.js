import { View, Text, StyleSheet, Image, Platform } from "react-native";
import Resources from "../../../src/Resources";
import BackIcon from "../../../ui/BackIcon";

export default function TopAppBar({ title = "" }) {
  return (
    <View style={styles.container}>
      <BackIcon style={{ position: "absolute", left: 16 }} />
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    top: 16,
  },
  textTitle: {
    fontWeight: "500",
    fontSize: 24,
    color: Resources.colors.black,
  },
});
