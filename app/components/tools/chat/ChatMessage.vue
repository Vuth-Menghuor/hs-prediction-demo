<template>
  <BaseCard
    :title="tool.toolName"
    icon="mdi-chat-outline"
    badge="chat"
    :copy-text="clipboardText"
  >
    <div class="py-3">
      <div
        class="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-800 leading-relaxed font-mono"
      >
        <span v-for="(chunk, i) in tool.streamChunks" :key="i">{{
          chunk.chunk
        }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import type { ToolResult } from "~/types";
import BaseCard from "~/components/ui/BaseCard.vue";

const props = defineProps<{ tool: ToolResult }>();

const clipboardText = computed(() => buildChatClipboard(props.tool));
</script>
