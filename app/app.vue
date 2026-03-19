<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTheme } from "~/composables/useTheme";

// Initialize theme on app startup
const { applyTheme } = useTheme();

onMounted(() => {
  applyTheme();
});
</script>
