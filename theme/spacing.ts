export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  // Page specific spacing
  page: 10,
  pageTop: 50,
  dropdown: 5,
  element: 10,
} as const;

// Legacy exports for backward compatibility
export const PADDING = {
  page_padding: spacing.page,
  top_page_padding: spacing.pageTop,
  dropdown_padding: spacing.dropdown,
};

export const MARGIN = {
  element_margin: spacing.element,
};