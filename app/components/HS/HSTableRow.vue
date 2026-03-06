<template>
  <tr class="hover:bg-gray-50 transition">
    <td class="!p-0 font-medium">{{ field }}</td>

    <td class="!p-0">
      <v-chip
        v-if="chip"
        variant="tonal"
        :color="color"
        label
        size="small"
        class="font-medium"
      >
        {{ value }}
      </v-chip>
      <span
        v-else
        :class="
          large
            ? 'text-2xl font-bold tracking-tight'
            : 'text-sm text-gray-600 font-medium'
        "
      >
        {{ value }}
      </span>
    </td>

    <td class="!p-0">
      <SourceChip :source="source" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import SourceChip from "../ui/SourceChip.vue";

const props = defineProps<{
  field: string;
  value: string;
  source: "prediction" | "structured";
  chip?: boolean;
  large?: boolean;
  color?: string;
}>();
</script>
