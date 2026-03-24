/**
 * Theme Types and Interfaces
 * Centralized type definitions for theme management
 */

export type ThemeMode = "light" | "dark" | "auto";

export interface ThemeColors {
  text: {
    primary: string;
    secondary: string;
    muted: string;
    light: string;
    lighter: string;
    lightest: string;
    hover: string;
  };
  background: {
    primary: string;
    secondary?: string;
    hover: string;
    button: string;
    buttonHover: string;
    surface?: string;
  };
  border: {
    primary: string;
    secondary: string;
    hover: string;
    light: string;
  };
  icon: {
    primary?: string;
    secondary: string;
  };
}

export interface Theme {
  name: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
}
