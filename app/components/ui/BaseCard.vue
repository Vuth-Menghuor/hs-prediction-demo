<template>
  <v-card
    elevation="0"
    variant="flat"
    class="rounded-2xl border border-gray-200/60 p-4"
  >
    <div class="flex items-center justify-between pb-3">
      <span class="text-base font-semibold tracking-wide">{{ title }}</span>
      <slot name="action" />
    </div>
    <v-divider />
    <slot />
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
