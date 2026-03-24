<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div class="flex-1 overflow-y-auto">
      <div class="w-full max-w-4xl mx-auto px-4 pt-6 pb-4">
        <ResultMeta
          :request-id="meta.requestId"
          :status="meta.status"
          class="mb-4"
        />
        <LoadingState v-if="loading" message="Running pipeline..." />
        <ErrorState v-else-if="error" :message="error" />
        <div v-else class="flex flex-col gap-4">
          <component
            v-for="tool in resolvedTools"
            :key="tool.toolName"
            :is="tool.component"
            :tool="tool"
          />
        </div>
      </div>
    </div>

    <!-- Pinned input bar -->
    <div class="input-bottom-bar pt-2 pb-4 flex justify-center mr-4">
      <div class="w-full max-w-4xl">
        <InputCard
          :prompt="prompt"
          :can-submit="canSubmit"
          :loading="loading"
          :selected-tools="selectedTools"
          :selected-tools-label="selectedToolsLabel"
          :tools="TOOLS"
          @update:prompt="$emit('update:prompt', $event)"
          @submit="$emit('submit')"
          @toggle-tool="$emit('toggle-tool', $event as ToolValue)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ResultMeta from "~/components/common/ResultMeta.vue";
import LoadingState from "~/components/common/LoadingState.vue";
import ErrorState from "~/components/common/ErrorState.vue";
import InputCard from "~/components/common/InputCard.vue";
import { TOOLS } from "~/composables/useToolSelector";
import type { ToolValue } from "~/composables/useToolSelector";
import type { PredictionMeta, ToolResult } from "~/types";
import type { Component } from "vue";

interface ResolvedTool extends ToolResult {
  component: Component;
}

interface Props {
  meta: PredictionMeta;
  prompt: string;
  canSubmit: boolean;
  loading: boolean;
  error: string | null;
  selectedTools: ToolValue[];
  selectedToolsLabel: string;
  resolvedTools: ResolvedTool[];
}

defineProps<Props>();

defineEmits<{
  (e: "update:prompt", value: string): void;
  (e: "submit"): void;
  (e: "toggle-tool", value: ToolValue): void;
}>();
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
