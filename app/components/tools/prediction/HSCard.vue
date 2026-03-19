```vue
<template>
  <BaseCard
    :title="tool.toolName"
    icon="mdi-tag-outline"
    badge="prediction"
    :copy-text="clipboardText"
  >
    <div class="flex items-end justify-end gap-2">
      <HSViewToggle v-model="viewMode" />
    </div>
    <div v-if="viewMode === 'Card'" class="pt-4 pb-2 flex flex-col gap-4">
      <div class="bg-gray-50 rounded-xl p-4 font-mono">
        <p class="text-xs font-medium text-gray-500 mb-1">HS Code</p>
        <p class="text-3xl font-bold">{{ tool.data?.hsCode ?? "—" }}</p>
      </div>

      <div class="bg-gray-50 rounded-xl p-4 font-mono">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-medium text-gray-500">Confidence</p>
          <v-chip
            size="x-small"
            :color="confidenceInfo.color"
            variant="tonal"
            class="font-semibold"
          >
            {{ confidenceInfo.percent }}%
          </v-chip>
        </div>
        <ConfidenceBar :confidence="tool.data?.confidence" />
      </div>
    </div>
    <HSTable v-else :tool="tool" />
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ToolResult, HSPredictionData, ViewMode } from "~/types";
import BaseCard from "~/components/ui/BaseCard.vue";
import HSViewToggle from "~/components/ui/HSViewToggle.vue";
import ConfidenceBar from "./ConfidenceBar.vue";
import HSTable from "./HSTable.vue";
import { getConfidenceInfo } from "~/utils/prediction";

const props = defineProps<{
  tool: ToolResult<HSPredictionData>;
}>();

const viewMode = ref<ViewMode>("Card");

const confidenceInfo = computed(() =>
  getConfidenceInfo(props.tool.data?.confidence),
);

const clipboardText = computed(() => buildHSClipboard(props.tool));
</script>
