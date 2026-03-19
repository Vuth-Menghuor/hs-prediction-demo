<template>
  <v-card
    elevation="0"
    variant="flat"
    class="rounded-2xl border border-gray-200/60 p-4"
  >
    <div class="flex items-center justify-between pb-3">
      <div class="flex items-center gap-2">
        <v-icon v-if="icon" size="18" :color="iconColor">{{ icon }}</v-icon>
        <span class="text-base font-semibold tracking-wide">{{ title }}</span>
      </div>
      <div class="flex items-center gap-2">
        <v-chip
          v-if="badge"
          variant="tonal"
          label
          size="small"
          class="ma-2 font-normal tracking-wider uppercase self-start"
        >
          {{ badge }}
        </v-chip>
        <CopyButton v-if="copyText" :text="copyText" />
      </div>
      <slot name="action" />
    </div>
    <v-divider />
    <slot />
  </v-card>
</template>

<script setup lang="ts">
import CopyButton from "./CopyButton.vue";

defineProps<{
  title: string;
  icon?: string;
  iconColor?: string;
  badge?: string;
  badgeColor?: string;
  copyText?: string;
}>();
</script>
