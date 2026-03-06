<template>
  <BaseCard title="HS Prediction">
    <div class="pt-4 pb-2 flex flex-col gap-4">
      <!-- HS Code -->
      <div class="bg-gray-50 rounded-xl p-4">
        <p class="text-xs font-medium text-gray-500 mb-1">HS Code</p>
        <p class="text-3xl font-bold">{{ prediction?.hsCode ?? "—" }}</p>
      </div>

      <!-- Confidence -->
      <div class="bg-gray-50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <p class="text-xs font-medium text-gray-500">Confidence</p>
          <v-chip
            size="x-small"
            color="success"
            variant="tonal"
            class="font-semibold"
          >
            {{
              prediction?.confidence
                ? Math.round(prediction.confidence * 100) + "%"
                : "—"
            }}
          </v-chip>
        </div>
        <ConfidenceBar :confidence="prediction?.confidence" />
      </div>

      <!-- Structured Output -->
      <template v-if="structured">
        <v-divider class="my-1" />
        <div class="rounded-xl p-4 bg-gray-100">
          <div class="flex items-center justify-between pb-3">
            <span class="text-base font-semibold tracking-wide"
              >Structure Output</span
            >
            <CopyButton :text="clipboardText" />
          </div>
          <HSStructuredChips :structured="structured" />
        </div>
      </template>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ConfidenceBar from "./ConfidenceBar.vue";
import HSStructuredChips from "./HSStructuredChips.vue";
import type { HSPrediction, StructuredOutput } from "~/types";
import BaseCard from "../ui/BaseCard.vue";
import CopyButton from "../ui/CopyButton.vue";

const props = defineProps<{
  prediction: HSPrediction | null;
  structured: StructuredOutput | null;
}>();

const clipboardText = computed(() =>
  props.structured
    ? `Product: ${props.structured.productName}\nCategory: ${props.structured.category}\nHS Code: ${props.structured.hsCode}`
    : "",
);
</script>
