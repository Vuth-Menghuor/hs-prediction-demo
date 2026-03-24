<template>
  <BaseCard
    :title="tool.toolName"
    :icon="icon"
    :badge="badge"
    :badge-color="badgeColor"
    :icon-color="badgeColor"
  >
    <div class="py-4 flex flex-col items-center gap-3 text-center">
      <v-progress-circular
        indeterminate
        size="32"
        :width="2"
        :color="badgeColor"
      />
      <p class="text-sm text-gray-500 font-mono tracking-tight">
        {{ message }}
        <span class="block text-xs text-gray-400 mt-0.5">{{
          tool.taskId
        }}</span>
      </p>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { ToolResult } from "~/types";
import BaseCard from "~/components/ui/BaseCard.vue";

defineProps<{
  tool: ToolResult;
  icon: string;
  badge: string;
  badgeColor?: string;
  message: string;
}>();
</script>
