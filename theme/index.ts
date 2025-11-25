import { borderRadius, BORDERRADIUS } from "./borderRadius";
import { colors, COLORS } from "./colors";
import { MARGIN, PADDING, spacing } from "./spacing";
import { FONT_SIZES, typography } from "./typography";

// this is going to be our global styling
// did it this way to keep it very simple.
export const global = {
  colors: {
    background_1: "#FFFFFE",
    background_2: "#E7E7EA",
    background_3: "#F7F7FC",
    background_4: "#E5E5EA",
    text_1: "#000000",
    text_2: "#333333",
    blue: "#5A99E4",
    green: "#5CE26E",
    red: "#EF6065",
    yellow: "#FFCC02",
  },

  border: {
    border_color: "#F0F1F9",
    border_radius: 2,
    border_radius_large: 4,
  },

  font_size: {
    tiny: 10,
    phone_medium: 16,
    phone_large: 18,
  },

  padding: {
    small: 5,
    medium: 10,
    large: 15,
  },

  margin: {
    page_border: 15,
    page_top: 50,
  },

  gap: {
    small: 5,
    medium: 10,
    large: 15,
  },
};

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
  border_radius: 2,
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
