<template>
  <v-table density="default" class="text-sm">
    <thead>
      <tr class="uppercase tracking-wider">
        <th
          v-for="col in TABLE_COLUMNS"
          :key="col"
          class="p-0! text-left text-gray-400 font-semibold"
        >
          {{ col }}
        </th>
      </tr>
    </thead>
    <tbody>
      <HSTableRow v-for="row in rows" :key="row.field" v-bind="row" />
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ToolResult, HSPredictionData } from "~/types";
import HSTableRow from "./HSTableRow.vue";
import { buildPredictionRows } from "~/utils/prediction";

const props = defineProps<{
  tool: ToolResult<HSPredictionData>;
}>();

const TABLE_COLUMNS = ["Field", "Value", "Source"];

const rows = computed(() =>
  buildPredictionRows(
    props.tool.data
      ? {
          hsCode: props.tool.data.hsCode,
          confidence: props.tool.data.confidence,
        }
      : null,
  ),
);
</script>
