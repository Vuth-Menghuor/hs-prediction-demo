<template>
  <div class="flex flex-col h-full overflow-y-auto">
    <div class="flex-1 flex flex-col justify-center">
      <div class="w-full max-w-4xl mx-auto px-4 pb-4">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold tracking-tight mb-1">
            {{ greeting.message }}, {{ greeting.userName }}
          </h1>
          <p class="text-[15px]">{{ greeting.subtitle }}</p>
        </div>

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

        <div class="flex flex-wrap gap-2 mb-5">
          <v-btn
            v-for="action in quickActions"
            :key="action.label"
            variant="tonal"
            :class="isDark"
            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-black/10 bg-black/5 text-xs font-medium whitespace-nowrap hover:bg-black/9 hover:text-[#2a2018] hover:border-black/16 transition-all duration-150 cursor-pointer"
          >
            <v-icon :icon="action.icon" size="13" />
            {{ action.label }}
          </v-btn>
        </div>

        <div class="grid gap-3 mb-5" style="grid-template-columns: 210px 1fr">
          <div class="rounded-2xl border border-black/8 bg-black/4 p-4">
            <div class="flex items-center gap-1 text-xs font-semibold mb-3">
              <span>{{ weather.location }}</span>
              <v-icon icon="mdi-navigation" size="12" />
            </div>
            <div class="flex items-end justify-between">
              <div>
                <div class="text-4xl font-bold leading-none mb-1">
                  {{ weather.temperature }}
                </div>
                <div class="text-[11px] leading-relaxed">
                  {{ weather.condition }}<br />
                  <span>H:{{ weather.high }} L:{{ weather.low }}</span>
                </div>
              </div>
              <v-icon :icon="weather.icon" size="50" class="opacity-80" />
            </div>
          </div>

          <div
            class="relative rounded-2xl border border-black/8 bg-black/4 p-4"
          >
            <v-btn
              icon
              density="compact"
              variant="tonal"
              class="!absolute top-2.5 right-2.5"
            >
              <v-icon icon="mdi-close" size="12" />
            </v-btn>
            <div
              class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-600 text-[10px] font-semibold mb-2"
            >
              <v-icon icon="mdi-star-four-points" size="9" />
              {{ announcement.badge }}
            </div>
            <div class="text-sm font-semibold mb-1.5">
              {{ announcement.title }}
            </div>
            <div class="text-xs leading-relaxed">
              {{ announcement.description }}
            </div>
          </div>
        </div>

        <div
          class="flex items-center gap-1.5 text-[13px] font-medium mb-3 cursor-pointer select-none"
        >
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
            <v-icon icon="mdi-clock-outline" size="15" class="mb-2 block" />
            <div class="text-[13px] font-semibold leading-snug mb-1.5">
              {{ chat.title }}
            </div>
            <div class="text-[11px]">
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
import { TOOLS } from "~/composables/useToolSelector";
import type { ToolValue } from "~/composables/useToolSelector";
import { useTheme } from "~/composables/useTheme";

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

const isDark = useTheme();
const quickActions = QUICK_ACTIONS;
const recentChats = RECENT_CHATS;
const greeting = GREETING;
const weather = WEATHER_DATA;
const announcement = ANNOUNCEMENT;
</script>
