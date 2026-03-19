/**
 * Theme Constants
 * Breakpoints, transitions, and theme options
 */

export const THEME_BREAKPOINTS = {
  mobile: "640px",
  tablet: "1024px",
  desktop: "1280px",
} as const;

export const THEME_TRANSITIONS = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
} as const;

export const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: "mdi-white-balance-sunny" },
  { value: "dark", label: "Dark", icon: "mdi-moon-waning-crescent" },
  { value: "auto", label: "Auto", icon: "mdi-brightness-auto" },
] as const;
