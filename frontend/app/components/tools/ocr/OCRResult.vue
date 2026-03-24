<template>
  <BaseCard
    :title="tool.toolName"
    icon="mdi-text-recognition"
    badge="ocr"
    :copy-text="tool.data?.text"
  >
    <div class="py-3">
      <div
        class="bg-gray-50 rounded-lg px-4 py-3 font-mono text-sm text-gray-700 whitespace-pre-wrap"
      >
        {{ tool.data?.text }}
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { ToolResult, OCRData } from "~/types";
import BaseCard from "~/components/ui/BaseCard.vue";

defineProps<{ tool: ToolResult<OCRData> }>();
</script>
