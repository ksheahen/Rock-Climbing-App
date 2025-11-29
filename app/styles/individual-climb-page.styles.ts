import { global } from "@/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    backgroundColor: global.colors.background_1,
    paddingLeft: global.margin.page_border,
    paddingRight: global.margin.page_border,
    paddingTop: global.margin.page_top,
    paddingBottom: global.margin.page_top,
  },
  scroll_container: {
    display: "flex",
    gap: global.gap.medium,
  },
  leftright_container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingBottom: global.padding.medium,
  },
  left: {},
  right: {
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  media: {
    borderRadius: global.border.border_radius,
    width: "100%",
    height: 400,
    backgroundColor: global.colors.background_2,
  },
  
  mediaScroll: {
    flex: 1,
  },
  
  mediaItem: {
    width: SCREEN_WIDTH - global.margin.page_border * 2,
    height: "100%",
  },
  modal_outter_container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modal_inner_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: 105,
    gap: global.gap.medium,
    padding: global.padding.large,
    backgroundColor: global.colors.background_1,
  },
  modal_button: {
    backgroundColor: global.colors.background_2,
    padding: global.padding.medium,
    height: "auto",
    borderRadius: global.border.border_radius,
  },
  modal_text: {
    fontSize: global.font_size.phone_medium,
  },
  save_container: {
    marginTop: global.margin.page_border,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  save_button: {
    backgroundColor: global.colors.background_2,
    padding: global.padding.medium,
    paddingLeft: 30,
    paddingRight: 30,
    height: "auto",
    width: "auto",
    borderRadius: global.border.border_radius,
  },
  save_text: {
    fontSize: global.font_size.phone_medium,
  },
});

export default styles;
