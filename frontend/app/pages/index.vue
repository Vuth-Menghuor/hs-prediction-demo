<template>
  <v-app>
    <v-main>
      <div
        class="flex flex-col h-screen overflow-hidden theme-root"
        :class="isDark ? 'theme-dark' : 'theme-light'"
      >
        <TopBar />

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
import { useToolSelector } from "~/composables/useToolSelector";
import { useToolResolver } from "~/composables/useToolResolver";
import { useHSPrediction } from "~/composables/useHSPrediction";
import { useHomeLayout } from "~/composables/useHomeLayout";
import { useTheme } from "~/composables/useTheme";
import { computed } from "vue";
import TopBar from "~/components/common/TopBar.vue";

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
const { showWelcomeView, showResponseView } = useHomeLayout({ rawResponse });
const { isDark } = useTheme();
</script>
