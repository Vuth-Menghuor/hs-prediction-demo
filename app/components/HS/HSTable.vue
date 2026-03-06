<template>
  <BaseCard title="HS Prediction">
    <template #action>
      <CopyButton :text="clipboardText" />
    </template>

    <v-table density="default" class="text-sm">
      <thead>
        <tr class="uppercase tracking-wider">
          <th
            v-for="col in ['Field', 'Value', 'Source']"
            :key="col"
            class="!p-0 text-left text-gray-400 font-semibold"
          >
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <HSTableRow v-for="row in rows" :key="row.field" v-bind="row" />
      </tbody>
    </v-table>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { HSPrediction, StructuredOutput } from "~/types";
import HSTableRow from "./HSTableRow.vue";
import BaseCard from "../ui/BaseCard.vue";
import CopyButton from "../ui/CopyButton.vue";

const props = defineProps<{
  prediction: HSPrediction | null;
  structured: StructuredOutput | null;
}>();

const clipboardText = computed(() => {
  const lines = [
    `HS Code: ${props.prediction?.hsCode ?? "—"}`,
    `Confidence: ${props.prediction?.confidence ? Math.round(props.prediction.confidence * 100) + "%" : "—"}`,
    ...(props.structured
      ? [
          `Product: ${props.structured.productName}`,
          `Category: ${props.structured.category}`,
        ]
      : []),
  ];
  return lines.join("\n");
});

const rows = computed(() => [
  {
    field: "HS Code",
    value: props.prediction?.hsCode ?? "—",
    source: "prediction" as const,
    large: true,
  },
  {
    field: "Confidence",
    value: props.prediction?.confidence
      ? Math.round(props.prediction.confidence * 100) + "%"
      : "—",
    source: "prediction" as const,
  },
  ...(props.structured
    ? [
        {
          field: "Product Name",
          value: props.structured.productName,
          source: "structured" as const,
          chip: true,
          color: "primary",
        },
        {
          field: "Category",
          value: props.structured.category,
          source: "structured" as const,
          chip: true,
          color: "secondary",
        },
      ]
    : []),
]);
</script>
