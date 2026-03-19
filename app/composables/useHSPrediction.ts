import { ref, computed } from "vue";
import type { ApiResponse, PredictionMeta } from "~/types";
import { PredictionService } from "~/services/prediction.service";

// ─── Composable ───────────────────────────────────────────────────────────────
export function useHSPrediction() {
  const prompt = ref("");
  const _meta = ref<PredictionMeta | null>(null);
  const rawResponse = ref<ApiResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Centralise the submit-readiness check here so the page stays thin.
  const canSubmit = computed(() => prompt.value.trim().length > 0);

  // Safe defaults so the template never needs `?? ''` fallbacks.
  const meta = computed<PredictionMeta>(() => ({
    requestId: _meta.value?.requestId ?? "",
    mode: _meta.value?.mode ?? "",
    status: _meta.value?.status ?? "pending",
  }));

  const fetchPrediction = async () => {
    if (!canSubmit.value) return;

    loading.value = true;
    error.value = null;

    try {
      const response = await PredictionService.fetchHSPrediction();

      rawResponse.value = response;

      _meta.value = {
        requestId: response.requestId,
        mode: response.mode,
        status: response.status,
      };
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "An unexpected error occurred.";
    } finally {
      loading.value = false;
    }
  };

  return {
    prompt,
    canSubmit,
    meta,
    rawResponse,
    loading,
    error,
    fetchPrediction,
  };
}
