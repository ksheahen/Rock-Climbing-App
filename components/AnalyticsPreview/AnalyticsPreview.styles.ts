import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    marginTop: global.padding.large * 2,
  },
  sectionTitle: {
    fontSize: global.font_size.phone_medium,
    fontWeight: 600,
    color: global.colors.text_1,
    marginBottom: global.padding.medium,
  },
});
