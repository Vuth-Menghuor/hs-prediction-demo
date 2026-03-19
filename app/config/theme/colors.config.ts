/**
 * Theme Color Definitions
 * Light and dark theme color schemes
 */

import type { ThemeColors } from "~/types/theme";

export const LIGHT_THEME_COLORS: ThemeColors = {
  text: {
    primary: "#1a1410",
    secondary: "#6b6258",
    muted: "#7a7068",
    light: "#8a8078",
    lighter: "#9a9088",
    lightest: "#b0a898",
    hover: "#2a2018",
  },
  background: {
    primary: "bg-black/4",
    secondary: "bg-black/2",
    hover: "bg-black/7",
    button: "bg-black/5",
    buttonHover: "bg-black/9",
    surface: "bg-white",
  },
  border: {
    primary: "border-black/8",
    secondary: "border-black/10",
    hover: "border-black/13",
    light: "border-black/16",
  },
  icon: {
    primary: "text-black/60",
    secondary: "text-[#8a9aaa]",
  },
};

export const DARK_THEME_COLORS: ThemeColors = {
  text: {
    primary: "#f5f3f0",
    secondary: "#d4ccc4",
    muted: "#a89888",
    light: "#8a7878",
    lighter: "#6a5858",
    lightest: "#504848",
    hover: "#fafaf8",
  },
  background: {
    primary: "bg-white/4",
    secondary: "bg-white/2",
    hover: "bg-white/7",
    button: "bg-white/5",
    buttonHover: "bg-white/9",
    surface: "bg-[#1a1a1a]",
  },
  border: {
    primary: "border-white/8",
    secondary: "border-white/10",
    hover: "border-white/13",
    light: "border-white/16",
  },
  icon: {
    primary: "text-white/60",
    secondary: "text-[#6a7aaa]",
  },
};
