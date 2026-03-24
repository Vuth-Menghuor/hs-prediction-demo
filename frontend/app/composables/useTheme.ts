import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useTheme as useVuetifyTheme } from "vuetify";
import type { ThemeOption } from "~/config/theme/constants.config";

const STORAGE_KEY = "app-theme-preference";
const preference = ref<ThemeOption>("auto");

export function useTheme() {
  const vuetifyTheme = useVuetifyTheme();

  function getSystemTheme(): "lightTheme" | "darkTheme" {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "darkTheme"
      : "lightTheme";
  }

  const resolvedTheme = computed<"lightTheme" | "darkTheme">(() => {
    if (preference.value === "auto") return getSystemTheme();
    return preference.value === "dark" ? "darkTheme" : "lightTheme";
  });

  watch(resolvedTheme, (val) => {
    vuetifyTheme.change(val);
  });

  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeOption | null;
    if (saved && ["light", "dark", "auto"].includes(saved)) {
      preference.value = saved;
    }

    vuetifyTheme.change(resolvedTheme.value);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (preference.value === "auto") {
        vuetifyTheme.change(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handler);
    onUnmounted(() => mediaQuery.removeEventListener("change", handler));
  });

  function setTheme(value: ThemeOption) {
    preference.value = value;
    localStorage.setItem(STORAGE_KEY, value);
  }

  const isDark = computed(() => vuetifyTheme.global.current.value.dark);

  return {
    isDark,
    themePreference: preference,
    resolvedTheme,
    setTheme,
  };
}
