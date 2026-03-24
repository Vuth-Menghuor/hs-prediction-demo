import { computed } from "vue";
import { useTheme } from "~/composables/useTheme";

export function useNavItemTheme() {
  const { isDark } = useTheme();

  return {
    isDark,
    activeBg: computed(() => (isDark.value ? "!bg-white/10" : "!bg-gray-100")),
    hoverBg: computed(() =>
      isDark.value ? "hover:!bg-white/5" : "hover:!bg-gray-900/5",
    ),
    activeText: computed(() =>
      isDark.value ? "!text-white" : "!text-gray-900",
    ),
    inactiveText: computed(() =>
      isDark.value ? "!text-gray-300" : "!text-gray-600",
    ),
    mutedText: computed(() =>
      isDark.value ? "!text-gray-400" : "!text-gray-500",
    ),
    activeIcon: computed(() => (isDark.value ? "text-white" : "text-gray-900")),
    inactiveIcon: computed(() =>
      isDark.value ? "text-gray-400" : "text-gray-600",
    ),
    borderLine: computed(() =>
      isDark.value ? "border-white/10" : "border-gray-200",
    ),
  };
}
