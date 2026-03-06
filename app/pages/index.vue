<template>
  <v-container max-width="800" class="py-8">
    <!-- Header -->
    <div class="flex justify-between items-end mb-4">
      <div class="flex flex-col gap-2">
        <h2 class="text-lg font-semibold uppercase">Pipeline Response</h2>
        <div class="flex items-center gap-2">
          <span class="text-sm">Request ID:</span>
          <v-chip
            v-if="meta"
            size="small"
            variant="flat"
            class="font-mono !px-4"
          >
            {{ meta.requestId }}
          </v-chip>
          <v-skeleton-loader v-else-if="loading" type="chip" width="140" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <HSViewToggle v-model="viewMode" />
      </div>
    </div>

    <!-- Error -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mb-4"
      :text="error"
    />

    <!-- View -->
    <component
      :is="activeView"
      :prediction="hsData"
      :structured="structuredData"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import HSCard from "~/components/HS/HSCard.vue";
import HSTable from "~/components/HS/HSTable.vue";
import type { ViewMode } from "~/types";

const { hsData, structuredData, meta, loading, error, fetchPrediction } =
  useHSPrediction();

const viewMode = ref<ViewMode>("Card");

const VIEW_MAP: Record<ViewMode, Component> = {
  Card: HSCard,
  Table: HSTable,
};

const activeView = computed(() => VIEW_MAP[viewMode.value]);

definePageMeta({ layout: "default" });

onMounted(() => fetchPrediction());
</script>
