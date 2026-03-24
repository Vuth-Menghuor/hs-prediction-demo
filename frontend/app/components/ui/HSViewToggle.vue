<template>
  <v-btn-toggle
    :model-value="modelValue"
    mandatory
    rounded="lg"
    density="compact"
    color="primary"
    variant="outlined"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-btn
      v-for="mode in viewModes"
      :key="mode"
      :value="mode"
      size="x-small"
      class="!mt-2 !px-6"
    >
      {{ mode }}
    </v-btn>
  </v-btn-toggle>
</template>

<script setup lang="ts">
import type { ViewMode } from "~/types";

defineProps<{ modelValue: ViewMode }>();
defineEmits<{ (e: "update:modelValue", value: ViewMode): void }>();

const viewModes: ViewMode[] = ["Card", "Table"];
</script>

<style scoped>
.v-btn {
  font-size: 0.7rem !important;
  letter-spacing: 0.02em;
}
</style>
