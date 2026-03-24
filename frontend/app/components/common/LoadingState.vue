<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-12 text-center"
  >
    <v-progress-circular indeterminate color="primary" size="48" />
    <p class="text-sm text-gray-500">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>
