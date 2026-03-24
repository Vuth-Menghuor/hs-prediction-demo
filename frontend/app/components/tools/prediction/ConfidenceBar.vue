<template>
  <div class="confidence-bar">
    <v-progress-linear :model-value="info.percent" height="8" rounded />
    <p class="text-xs mt-1.5 text-gray-400">{{ info.label }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { getConfidenceInfo } from "~/utils/prediction";

const props = defineProps<{ confidence: number | undefined }>();

const info = computed(() => getConfidenceInfo(props.confidence));
</script>
