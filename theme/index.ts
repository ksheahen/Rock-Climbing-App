import { colors, COLORS } from "./colors";
import { typography, FONT_SIZES } from "./typography";
import { spacing, PADDING, MARGIN } from "./spacing";
import { borderRadius, BORDERRADIUS } from "./borderRadius";

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
} as const;

// Legacy exports for backward compatibility during migration
export { colors, COLORS };
export { typography, FONT_SIZES };
export { spacing, PADDING, MARGIN };
export { borderRadius, BORDERRADIUS };

// Default export
export default theme;

