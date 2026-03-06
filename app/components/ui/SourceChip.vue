<template>
  <v-chip
    size="small"
    label
    :color="color"
    variant="tonal"
    class="font-medium capitalize"
  >
    {{ source }}
  </v-chip>
</template>

<script setup lang="ts">
const props = defineProps<{ source: "prediction" | "structured" }>();
const color = computed(() =>
  props.source === "prediction" ? "primary" : "secondary",
);
</script>
