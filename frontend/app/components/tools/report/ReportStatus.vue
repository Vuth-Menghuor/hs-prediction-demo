<template>
  <PendingCard
    :tool="tool"
    icon="mdi-file-chart-outline"
    badge="report"
    message="Generating report"
  />
</template>

<script setup lang="ts">
import PendingCard from "~/components/ui/PendingCard.vue";
import type { ToolResult } from "~/types";

defineProps<{ tool: ToolResult }>();
</script>
