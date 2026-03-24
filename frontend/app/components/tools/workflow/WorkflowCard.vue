<template>
  <BaseCard :title="tool.toolName" icon="mdi-sitemap-outline" badge="workflow">
    <div class="py-3 flex flex-col gap-3">
      <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">
        Intent
      </p>
      <div class="bg-gray-50 rounded-lg px-4 py-2">
        <p class="text-sm font-semibold">
          {{ tool.data?.intent }}
        </p>
      </div>

      <!-- Steps -->
      <div>
        <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Steps
        </p>
        <template v-if="tool.data?.workflowSteps?.length">
          <v-timeline direction="horizontal" side="end" truncate-line="both">
            <v-timeline-item
              v-for="(step, i) in tool.data?.workflowSteps"
              :key="i"
              size="small"
            >
              <template #icon>
                <span class="font-mono text-xs font-normal text-gray-100">
                  {{ String(i + 1).padStart(2, "0") }}</span
                >
              </template>

              <template #default>
                <p
                  class="px-4 py-3 font-mono text-sm font-normal text-gray-700 whitespace-pre-wrap text-center"
                >
                  {{ step }}
                </p>
              </template>
            </v-timeline-item>
          </v-timeline>
        </template>
        <p v-else class="text-xs text-gray-400 italic mt-2">
          No steps defined.
        </p>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { ToolResult, WorkflowData } from "~/types";
import BaseCard from "~/components/ui/BaseCard.vue";

defineProps<{ tool: ToolResult<WorkflowData> }>();
</script>
