<template>
  <div class="flex items-center justify-between flex-wrap gap-2">
    <header class="text-xs">
      <span class="uppercase font-semibold mb-1 text-lg text-gray-800">
        tool pipeline monitor
      </span>
      <div
        class="flex items-center gap-2 mt-2 text-base font-medium text-gray-700 font-mono mb-4"
      >
        <span>Request ID: </span>
        <v-chip size="small"> {{ requestId }}</v-chip>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  requestId: string;
  status: string;
}>();
</script>
