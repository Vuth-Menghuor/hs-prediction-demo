<template>
  <v-dialog v-model="isOpen" max-width="400px" @update:model-value="onDialogChange">
    <template #activator="{ props: dialogProps }">
      <v-btn
        v-bind="dialogProps"
        icon
        size="small"
        variant="text"
        class="appearance-btn"
        :title="`Switch theme (Current: ${currentTheme})`"
      >
        <v-icon v-if="isDark" icon="mdi-moon-waning-crescent" />
        <v-icon v-else icon="mdi-white-balance-sunny" />
      </v-btn>
    </template>

    <!-- Dialog Content -->
    <v-card class="theme-dialog">
      <v-card-title class="d-flex align-center gap-2 pb-2">
        <v-icon icon="mdi-palette" />
        Appearance
      </v-card-title>

      <v-divider />

      <v-card-text class="pt-4">
        <!-- Theme Selection -->
        <div class="mb-4">
          <p class="text-sm font-medium mb-3">Theme Mode</p>
          <div class="space-y-2">
            <v-radio-group v-model="selectedTheme" class="space-y-2">
              <div v-for="option in themeOptions" :key="option.value" class="flex items-center gap-2">
                <v-radio :value="option.value" hide-details />
                <v-icon :icon="option.icon" size="small" />
                <span class="text-sm">{{ option.label }}</span>
              </div>
            </v-radio-group>
          </div>
        </div>

        <!-- Current Theme Info -->
        <v-divider class="my-3" />
        <div class="text-xs text-gray-500 p-2 bg-gray-100 rounded">
          <p v-if="currentTheme === 'auto'" class="mb-1">
            <strong>Auto Mode:</strong> Following system preference
          </p>
          <p>
            <strong>Active Theme:</strong>
            <span class="capitalize ml-1">{{ effectiveTheme }}</span>
          </p>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pt-3">
        <v-spacer />
        <v-btn variant="plain" @click="isOpen = false"> Close </v-btn>
        <v-btn variant="flat" color="primary" @click="applyTheme"> Apply </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useTheme } from "~/composables/useTheme";
import { THEME_OPTIONS } from "~/config/theme";

const { currentTheme, effectiveTheme, isDark, setTheme } = useTheme();
const isOpen = ref(false);
const selectedTheme = ref(currentTheme.value);
const themeOptions = THEME_OPTIONS;

// Watch for changes to currentTheme from outside this component
watch(currentTheme, (newTheme) => {
  selectedTheme.value = newTheme;
});

const onDialogChange = (value: boolean) => {
  if (!value && selectedTheme.value !== currentTheme.value) {
    // Reset if dialog closed without applying
    selectedTheme.value = currentTheme.value;
  }
};

const applyTheme = () => {
  setTheme(selectedTheme.value as any);
  isOpen.value = false;
};
</script>

<style scoped>
.appearance-btn {
  transition: all 0.3s ease;
}

.appearance-btn:hover {
  transform: scale(1.1);
}

.theme-dialog {
  backdrop-filter: blur(10px);
}
</style>
