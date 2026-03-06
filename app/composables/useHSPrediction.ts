import { ref } from "vue";
import type {
  ApiResponse,
  HSPrediction,
  PredictionMeta,
  StructuredOutput,
  ToolResult,
} from "~/types";

// ─── Tool name constants ───────────────────────────────────────────────────────
const TOOL_HS_PREDICTION = "HS Prediction";
const TOOL_STRUCTURED_FORMATTER = "Structured Response Formatter";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function findTool<T>(tools: ToolResult[], name: string): T | null {
  return (tools.find((t) => t.toolName === name)?.data as T) ?? null;
}

// ─── Composable ───────────────────────────────────────────────────────────────
export function useHSPrediction() {
  const hsData = ref<HSPrediction | null>(null);
  const structuredData = ref<StructuredOutput | null>(null);
  const meta = ref<PredictionMeta | null>(null);
  const rawResponse = ref<ApiResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPrediction = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiResponse>("/api/hs-prediction");

      rawResponse.value = response;

      meta.value = {
        requestId: response.requestId,
        mode: response.mode,
        status: response.status,
      };

      hsData.value = findTool<HSPrediction>(response.tools, TOOL_HS_PREDICTION);

      const formatted = findTool<{ formattedOutput: StructuredOutput }>(
        response.tools,
        TOOL_STRUCTURED_FORMATTER,
      );
      structuredData.value = formatted?.formattedOutput ?? null;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "An unexpected error occurred.";
    } finally {
      loading.value = false;
    }
  };

  return {
    hsData,
    structuredData,
    meta,
    rawResponse,
    loading,
    error,
    fetchPrediction,
  };
}
