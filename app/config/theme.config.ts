/**
 * Theme Configuration
 * Centralized color values and theme constants
 */

export const COLORS = {
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
    hover: "bg-black/[0.07]",
    button: "bg-black/[0.05]",
    buttonHover: "bg-black/[0.09]",
  },
  border: {
    primary: "border-black/[0.08]",
    secondary: "border-black/10",
    hover: "border-black/[0.13]",
    light: "border-black/[0.16]",
  },
  icon: {
    secondary: "text-[#8a9aaa]",
  },
} as const;

export const BREAKPOINTS = {
  mobile: "640px",
  tablet: "1024px",
  desktop: "1280px",
} as const;

export const TRANSITIONS = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
} as const;
