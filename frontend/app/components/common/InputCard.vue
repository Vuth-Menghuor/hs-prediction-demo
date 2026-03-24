<template>
  <div
    class="input-card rounded-2xl border overflow-visible"
    :class="isDark ? 'border-gray-700' : 'border-gray-200'"
  >
    <div class="px-4 pt-4 pb-2">
      <v-textarea
        :model-value="prompt"
        placeholder="Ask Synapse AI.."
        rows="1"
        auto-grow
        max-rows="6"
        variant="plain"
        density="compact"
        hide-details
        class="text-h4"
        @update:model-value="$emit('update:prompt', $event)"
        @keydown.enter.prevent="$emit('submit')"
        @keydown.ctrl.enter="$emit('submit')"
        @keydown.meta.enter="$emit('submit')"
      />
    </div>

    <div class="flex items-center justify-between gap-2 px-3 py-2.5">
      <v-menu
        :close-on-content-click="false"
        location="top start"
        min-width="260"
      >
        <template #activator="{ props: menuProps, isActive }">
          <v-btn variant="tonal" v-bind="menuProps">
            {{ selectedToolsLabel }}
            <v-icon
              :class="
                isActive
                  ? 'rotate-180 transition-transform duration-300'
                  : 'transition-transform duration-300'
              "
            >
              mdi-arrow-up
            </v-icon>
          </v-btn>
        </template>

        <div
          class="bg-white border border-black/10 rounded-xl shadow-xl overflow-hidden py-1.5"
        >
          <div class="px-3 py-1.5">
            <p
              class="text-[10px] font-mono font-semibold uppercase tracking-widest"
            >
              Active tools
            </p>
          </div>
          <div
            v-for="tool in tools"
            :key="tool.value"
            class="flex items-center gap-3 px-3 py-2 hover:bg-black/[0.04] transition-colors duration-100 cursor-pointer"
            @click="$emit('toggle-tool', tool.value)"
          >
            <div
              class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150"
              :class="
                selectedTools.includes(tool.value)
                  ? 'bg-indigo-500/20 text-indigo-500'
                  : 'bg-black/[0.06] text-[#a09890]'
              "
            >
              <v-icon :icon="tool.icon" size="15" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs font-medium leading-tight">
                {{ tool.label }}
              </p>
              <p class="text-[11px] leading-tight truncate">
                {{ tool.subtitle }}
              </p>
            </div>
            <div
              class="w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-colors duration-150"
              :class="
                selectedTools.includes(tool.value)
                  ? 'border-indigo-500 bg-indigo-500'
                  : 'border-black/20 bg-transparent'
              "
            />
          </div>
        </div>
      </v-menu>

      <div class="flex items-center gap-2">
        <button
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-black/[0.05] hover:bg-black/10 hover:text-[#3a3028] transition-all duration-150 cursor-pointer"
        >
          <v-icon icon="mdi-paperclip" size="17" />
        </button>
        <button
          class="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 bg-black/[0.05] hover:bg-black/10 hover:text-[#3a3028] transition-all duration-150 cursor-pointer"
        >
          <v-icon icon="mdi-web" size="17" />
        </button>
        <button
          class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-150"
          :class="
            canSubmit && !loading
              ? 'send-btn-active text-white cursor-pointer hover:scale-105 active:scale-95'
              : 'bg-black/[0.07] text-[#c0b8b0] cursor-not-allowed'
          "
          :disabled="!canSubmit || loading"
          @click="$emit('submit')"
        >
          <v-icon icon="mdi-waveform" size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";

const { isDark } = useTheme();

defineProps<{
  prompt: string;
  canSubmit: boolean;
  loading: boolean;
  selectedTools: string[];
  selectedToolsLabel: string;
  tools: { value: string; label: string; subtitle: string; icon: string }[];
}>();

defineEmits<{
  (e: "update:prompt", value: string): void;
  (e: "submit"): void;
  (e: "toggle-tool", value: string): void;
}>();
</script>
