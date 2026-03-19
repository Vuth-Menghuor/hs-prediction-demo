<template>
  <v-app>
    <!-- Top Bar with Theme Toggle -->
    <TopBar />
    
    <v-main>
      <div
        :class="[
          'flex flex-col h-screen overflow-hidden',
          isDark ? 'dark-bg' : 'home-bg',
          isDark ? 'text-[#f5f3f0]' : 'text-[#1a1410]',
        ]"
        :style="{
          backgroundColor: isDark ? '#0f0f0f' : '#fefaf5',
          transition: 'background-color 0.3s ease',
        }"
      >
        <!-- Welcome View -->
        <transition name="home-fade">
          <WelcomeView
            v-if="showWelcomeView"
            :prompt="prompt"
            :can-submit="canSubmit"
            :loading="loading"
            :selected-tools="selectedTools"
            :selected-tools-label="selectedToolsLabel"
            @update:prompt="prompt = $event"
            @submit="fetchPrediction"
            @toggle-tool="toggleTool"
          />
        </transition>

        <!-- Response View -->
        <transition name="home-fade">
          <ResponseView
            v-if="showResponseView"
            :meta="meta"
            :prompt="prompt"
            :can-submit="canSubmit"
            :loading="loading"
            :error="error"
            :selected-tools="selectedTools"
            :selected-tools-label="selectedToolsLabel"
            :resolved-tools="resolvedTools"
            @update:prompt="prompt = $event"
            @submit="fetchPrediction"
            @toggle-tool="toggleTool"
          />
        </transition>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });

import WelcomeView from "~/components/views/WelcomeView.vue";
import ResponseView from "~/components/views/ResponseView.vue";
import TopBar from "~/components/common/TopBar.vue";
import { TOOLS, useToolSelector } from "~/composables/useToolSelector";
import { useToolResolver } from "~/composables/useToolResolver";
import { useHSPrediction } from "~/composables/useHSPrediction";
import { useHomeLayout } from "~/composables/useHomeLayout";
import { useTheme } from "~/composables/useTheme";
import { computed } from "vue";

// ── Composables ──────────────────────────────────────────────────────────────
const { selectedTools, selectedToolsLabel, toggleTool } = useToolSelector();

const {
  prompt,
  canSubmit,
  meta,
  rawResponse,
  loading,
  error,
  fetchPrediction,
} = useHSPrediction();

const { resolvedTools } = useToolResolver(
  selectedTools,
  computed(() => rawResponse.value?.tools ?? []),
);

const { showWelcomeView, showResponseView } = useHomeLayout({
  rawResponse,
});

const { isDark } = useTheme();
</script>

<style scoped>
/* ── Background Animations ────────────────────────────────────────────────────── */
.home-bg {
  background: linear-gradient(135deg, #fefaf5 0%, #f5f0eb 100%);
}

.dark-bg {
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
}

/* ── Transitions ────────────────────────────────────────────────────────────── */
.home-fade-enter-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.home-fade-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
  position: absolute;
  width: 100%;
}
.home-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.home-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
