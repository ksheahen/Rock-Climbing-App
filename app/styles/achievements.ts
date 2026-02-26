import { global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.colors.background_1,
  },
  header: {
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: global.font_size.phone_large,
    fontWeight: 600,
    color: global.colors.text_1,
    marginRight: 30,
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
  },
  backbtnContainer: {
    width: "100%",
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: global.padding.medium,
    paddingBottom: global.padding.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: global.colors.text_1,
  },
});

export default styles;
