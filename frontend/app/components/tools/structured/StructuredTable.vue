<template>
  <BaseCard
    :title="tool.toolName"
    icon="mdi-table"
    badge="output"
    :copy-text="clipboardText"
  >
    <div class="py-3">
      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="(value, key) in output"
          :key="key"
          class="bg-gray-50 rounded-lg px-3 py-2 font-mono"
        >
          <div class="text-xs font-medium text-gray-500 mb-2">
            {{ key }}
          </div>
          <div class="text-base font-semibold tracking-tight">
            {{ value ?? "—" }}
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ToolResult, StructuredOutputData } from "~/types";
import BaseCard from "~/components/ui/BaseCard.vue";

const props = defineProps<{ tool: ToolResult<StructuredOutputData> }>();

const output = computed(() => props.tool.data?.formattedOutput);

const clipboardText = computed(() => buildStructuredClipboard(props.tool));
</script>
