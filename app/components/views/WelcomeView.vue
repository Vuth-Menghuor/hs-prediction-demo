<template>
  <div class="flex flex-col h-full overflow-y-auto">
    <div class="flex-1 flex flex-col justify-center">
      <div class="w-full max-w-4xl mx-auto px-4 pb-4">
        <!-- Greeting -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold tracking-tight text-[#1a1410] mb-1">
            {{ greeting.message }}, {{ greeting.userName }}
          </h1>
          <p class="text-[15px] text-[#6b6258]">{{ greeting.subtitle }}</p>
        </div>

        <!-- Input card -->
        <InputCard
          :prompt="prompt"
          :can-submit="canSubmit"
          :loading="loading"
          :selected-tools="selectedTools"
          :selected-tools-label="selectedToolsLabel"
          :tools="TOOLS"
          class="mb-4"
          @update:prompt="$emit('update:prompt', $event)"
          @submit="$emit('submit')"
          @toggle-tool="$emit('toggle-tool', $event as ToolValue)"
        />

        <!-- Quick action chips -->
        <div class="flex flex-wrap gap-2 mb-5">
          <button
            v-for="action in quickActions"
            :key="action.label"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-black/10 bg-black/5 text-[#5a5048] text-xs font-medium whitespace-nowrap hover:bg-black/9 hover:text-[#2a2018] hover:border-black/16 transition-all duration-150 cursor-pointer"
          >
            <v-icon :icon="action.icon" size="13" />
            {{ action.label }}
          </button>
        </div>

        <!-- Widget row -->
        <div class="grid gap-3 mb-5" style="grid-template-columns: 210px 1fr">
          <!-- Weather card -->
          <div class="rounded-2xl border border-black/8 bg-black/4 p-4">
            <div class="flex items-center gap-1 text-xs font-semibold text-[#3a3028] mb-3">
              <span>{{ weather.location }}</span>
              <v-icon icon="mdi-navigation" size="12" />
            </div>
            <div class="flex items-end justify-between">
              <div>
                <div class="text-4xl font-bold text-[#1a1410] leading-none mb-1">
                  {{ weather.temperature }}
                </div>
                <div class="text-[11px] text-[#7a7068] leading-relaxed">
                  {{ weather.condition }}<br />
                  <span class="text-[#9a9088]"
                    >H:{{ weather.high }} L:{{ weather.low }}</span
                  >
                </div>
              </div>
              <v-icon
                :icon="weather.icon"
                size="50"
                class="text-[#8a9aaa] opacity-80"
              />
            </div>
          </div>

          <!-- Announcement card -->
          <div class="relative rounded-2xl border border-black/8 bg-black/4 p-4">
            <button
              class="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-md bg-black/6 text-[#8a8078] hover:bg-black/10 transition-colors duration-150 cursor-pointer border-0"
            >
              <v-icon icon="mdi-close" size="13" />
            </button>
            <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-600 text-[10px] font-semibold mb-2">
              <v-icon icon="mdi-star-four-points" size="9" />
              {{ announcement.badge }}
            </div>
            <div class="text-sm font-semibold text-[#1a1410] mb-1.5">
              {{ announcement.title }}
            </div>
            <div class="text-xs text-[#7a7068] leading-relaxed">
              {{ announcement.description }}
            </div>
          </div>
        </div>

        <!-- Recent chats -->
        <div class="flex items-center gap-1.5 text-[13px] font-medium text-[#8a8078] mb-3 cursor-pointer select-none">
          <v-icon icon="mdi-clock-outline" size="15" />
          Your recent chats
          <v-icon icon="mdi-chevron-down" size="15" />
        </div>

        <div class="grid grid-cols-3 gap-2.5">
          <div
            v-for="chat in recentChats"
            :key="chat.title"
            class="rounded-2xl border border-black/8 bg-black/4 p-3.5 cursor-pointer hover:bg-black/7 hover:border-black/13 transition-all duration-150"
          >
            <v-icon icon="mdi-clock-outline" size="15" class="text-[#b0a898] mb-2 block" />
            <div class="text-[13px] font-semibold text-[#2a2018] leading-snug mb-1.5">
              {{ chat.title }}
            </div>
            <div class="text-[11px] text-[#9a9088]">
              {{ chat.time }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputCard from "~/components/common/InputCard.vue";
import { TOOLS, useToolSelector } from "~/composables/useToolSelector";
import type { ToolValue } from "~/composables/useToolSelector";
import {
  QUICK_ACTIONS,
  RECENT_CHATS,
  GREETING,
  WEATHER_DATA,
  ANNOUNCEMENT,
} from "~/config/home.config";

interface Props {
  prompt: string;
  canSubmit: boolean;
  loading: boolean;
  selectedTools: ToolValue[];
  selectedToolsLabel: string;
}

defineProps<Props>();

defineEmits<{
  (e: "update:prompt", value: string): void;
  (e: "submit"): void;
  (e: "toggle-tool", value: ToolValue): void;
}>();

const quickActions = QUICK_ACTIONS;
const recentChats = RECENT_CHATS;
const greeting = GREETING;
const weather = WEATHER_DATA;
const announcement = ANNOUNCEMENT;
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
