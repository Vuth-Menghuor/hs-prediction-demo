<template>
  <v-btn variant="plain" size="small" @click="copy(text)">
    <v-icon size="14">{{ copied ? "mdi-check" : "mdi-content-copy" }}</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useClipboard } from "~/composables/useClipboard";

defineProps<{ text: string }>();

const { copied, copy } = useClipboard();
</script>
