/**
 * Theme Configuration Exports
 */

export { LIGHT_THEME_COLORS, DARK_THEME_COLORS } from "./colors.config";
export {
  THEME_BREAKPOINTS,
  THEME_TRANSITIONS,
  THEME_OPTIONS,
} from "./constants.config";

// Re-export types from the canonical location
export type { ThemeColors, ThemeMode } from "~/types/theme";
