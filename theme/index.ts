import { borderRadius, BORDERRADIUS } from "./borderRadius";
import { colors, COLORS } from "./colors";
import { MARGIN, PADDING, spacing } from "./spacing";
import { FONT_SIZES, typography } from "./typography";

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
} as const;

export const GLOBAL = {
  // page padding
  page_leftright_margin: 15,
  page_top_margin: 50,
  page_bottom_margin: 15,

  // spacing between components
  component_spacing_small: 5,
  component_spacing_medium: 10,
  component_spacing_large: 15,

  // border radius for buttons, images, ext
  border_radius: 3,
};

// Legacy exports for backward compatibility during migration
export {
  borderRadius,
  BORDERRADIUS,
  colors,
  COLORS,
  FONT_SIZES,
  MARGIN,
  PADDING,
  spacing,
  typography
};

// Default export
export default theme;
