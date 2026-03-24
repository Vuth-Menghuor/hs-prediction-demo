<template>
  <BaseCard
    :title="tool.toolName"
    icon="mdi-trending-up"
    badge="prediction"
    :copy-text="clipboardText"
  >
    <div class="py-3 flex flex-col gap-3">
      <div class="bg-gray-50 rounded-xl p-4 font-mono">
        <p class="text-xs font-medium text-gray-500 mb-2">Predicted Volume</p>
        <p class="text-3xl font-bold tracking-tighter">
          {{ formattedVolume }}
        </p>
      </div>
      <div class="bg-gray-50 rounded-xl p-4 font-mono">
        <p class="text-xs font-medium text-gray-500 mb-2">Year</p>
        <p class="text-3xl font-semibold">
          {{ tool.data?.year ?? "—" }}
        </p>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ToolResult, FuturePredictionData } from "~/types";
import BaseCard from "~/components/ui/BaseCard.vue";
import { formatVolume } from "~/utils/prediction";
import { buildFuturePredictionClipboard } from "~/utils/clipboard";

const props = defineProps<{ tool: ToolResult<FuturePredictionData> }>();

const formattedVolume = computed(() =>
  formatVolume(props.tool.data?.predictedVolume),
);

const clipboardText = computed(() =>
  buildFuturePredictionClipboard(props.tool),
);
</script>
