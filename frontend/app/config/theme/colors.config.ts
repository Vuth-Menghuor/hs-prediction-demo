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
    primary: "bg-black/[0.04]",
    secondary: "bg-black/[0.02]",
    hover: "bg-black/[0.07]",
    button: "bg-black/[0.05]",
    buttonHover: "bg-black/[0.09]",
    surface: "bg-white",
  },
  border: {
    primary: "border-black/[0.08]",
    secondary: "border-black/[0.10]",
    hover: "border-black/[0.13]",
    light: "border-black/[0.16]",
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
    primary: "bg-white/[0.04]",
    secondary: "bg-white/[0.02]",
    hover: "bg-white/[0.07]",
    button: "bg-white/[0.05]",
    buttonHover: "bg-white/[0.09]",
    surface: "bg-[#1a1a1a]",
  },
  border: {
    primary: "border-white/[0.08]",
    secondary: "border-white/[0.10]",
    hover: "border-white/[0.13]",
    light: "border-white/[0.16]",
  },
  icon: {
    primary: "text-white/60",
    secondary: "text-[#6a7aaa]",
  },
};
