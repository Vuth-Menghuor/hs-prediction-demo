<template>
  <div class="flex flex-wrap gap-2">
    <v-chip
      v-for="item in chips"
      :key="item.label"
      variant="tonal"
      :color="item.color"
      label
      size="small"
      class="font-medium"
    >
      <span class="font-semibold mr-1">{{ item.label }}:</span>
      {{ item.value }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import type { StructuredOutput } from "~/types";

const props = defineProps<{ structured: StructuredOutput }>();

const chips = computed(() => [
  { label: "Product", value: props.structured.productName, color: "primary" },
  { label: "Category", value: props.structured.category, color: "secondary" },
  { label: "HS", value: props.structured.hsCode, color: "info" },
]);
</script>
