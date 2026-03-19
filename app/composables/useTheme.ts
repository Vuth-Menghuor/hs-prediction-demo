/**
 * Theme Composable
 * Manages theme state, persistence, and switching
 */

import { ref, computed, onMounted } from "vue";
import type { ThemeMode } from "~/types/theme";
import { LIGHT_THEME_COLORS, DARK_THEME_COLORS } from "~/config/theme";

const STORAGE_KEY = "app-theme-mode";

export function useTheme() {
  const currentTheme = ref<ThemeMode>("light");
  const mounted = ref(false);

  // Get system preference for dark mode
  const getSystemPreference = (): ThemeMode => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser && window.matchMedia) {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "dark" : "light";
    }
    return "light";
  };

  // Load theme from storage or system
  const loadTheme = () => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      if (stored && ["light", "dark", "auto"].includes(stored)) {
        currentTheme.value = stored;
      } else {
        currentTheme.value = "auto";
      }
    }
  };

  // Get effective theme (resolves 'auto' to actual theme)
  const effectiveTheme = computed<ThemeMode>(() => {
    if (currentTheme.value === "auto") {
      return getSystemPreference();
    }
    return currentTheme.value;
  });

  // Get current colors based on effective theme
  const currentColors = computed(() => {
    return effectiveTheme.value === "dark" ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
  });

  // Check if dark mode is active
  const isDark = computed(() => effectiveTheme.value === "dark");

  // Set theme
  const setTheme = (theme: ThemeMode) => {
    currentTheme.value = theme;
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
    applyTheme();
  };

  // Apply theme to document
  const applyTheme = () => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      const html = document.documentElement;
      if (isDark.value) {
        html.classList.add("dark");
        html.style.colorScheme = "dark";
      } else {
        html.classList.remove("dark");
        html.style.colorScheme = "light";
      }
    }
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    if (currentTheme.value === "auto") {
      setTheme(isDark.value ? "light" : "dark");
    } else {
      setTheme(currentTheme.value === "light" ? "dark" : "light");
    }
  };

  // Watch for system theme changes when in auto mode
  onMounted(() => {
    loadTheme();
    applyTheme();
    mounted.value = true;

    const isBrowser = typeof window !== "undefined";
    if (isBrowser && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        if (currentTheme.value === "auto") {
          applyTheme();
        }
      };
      mediaQuery.addEventListener("change", handleChange);
    }
  });

  return {
    currentTheme,
    effectiveTheme,
    currentColors,
    isDark,
    mounted,
    setTheme,
    toggleTheme,
    applyTheme,
  };
}
