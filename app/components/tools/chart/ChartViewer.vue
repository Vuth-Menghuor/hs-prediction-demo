<template>
  <PendingCard
    :tool="tool"
    icon="mdi-chart-bar"
    badge="chart"
    message="Generating chart"
  />
</template>

<script setup lang="ts">
import type { ToolResult } from "~/types";
import PendingCard from "~/components/ui/PendingCard.vue";

defineProps<{ tool: ToolResult }>();
</script>
