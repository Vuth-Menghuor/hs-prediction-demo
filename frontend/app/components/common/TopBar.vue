<template>
  <div class="inline-flex items-center">
    <v-btn icon @click="dialog = true">
      <v-icon :icon="currentIcon" />
    </v-btn>

    <v-dialog v-model="dialog" width="320">
      <v-card rounded="xl">
        <v-card-text class="flex flex-col gap-2">
          <v-btn
            v-for="opt in THEME_OPTIONS"
            :key="opt.value"
            :variant="themePreference === opt.value ? 'flat' : 'text'"
            class="justify-start"
            @click="select(opt.value)"
          >
            <v-icon :icon="opt.icon" class="mr-2" />
            {{ opt.label }}
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "~/composables/useTheme";
import { THEME_OPTIONS } from "~/config/theme";
import type { ThemeOption } from "~/config/theme/constants.config";

const dialog = ref(false);
const { themePreference, setTheme } = useTheme();

function select(value: ThemeOption) {
  setTheme(value);
  dialog.value = false;
}

const currentIcon = computed(
  () =>
    THEME_OPTIONS.find(
      (o: { value: ThemeOption }) => o.value === themePreference.value,
    )?.icon ?? "mdi-brightness-auto",
);
</script>
