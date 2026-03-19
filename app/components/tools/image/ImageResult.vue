<template>
  <PendingCard
    :tool="tool"
    icon="mdi-image-outline"
    badge="image"
    message="Generating image"
  />
</template>

<script setup lang="ts">
import type { ToolResult } from "~/types";
import PendingCard from "~/components/ui/PendingCard.vue";

defineProps<{ tool: ToolResult }>();
</script>
