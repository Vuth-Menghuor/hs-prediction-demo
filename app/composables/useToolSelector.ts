import { ref, computed } from "vue";

// ─── Tool registry ────────────────────────────────────────────────────────────
// Single source of truth: label, value, icon, subtitle all in one place.
export const TOOLS = [
  {
    label: "Workflow",
    value: "workflow",
    icon: "mdi-sitemap-outline",
    subtitle: "Orchestrate agent steps",
  },
  {
    label: "RAG Chat",
    value: "chat",
    icon: "mdi-chat-outline",
    subtitle: "Retrieval-augmented chat",
  },
  {
    label: "OCR",
    value: "ocr",
    icon: "mdi-text-recognition",
    subtitle: "Extract text from images",
  },
  {
    label: "HS Predict",
    value: "prediction",
    icon: "mdi-tag-outline",
    subtitle: "Classify HS codes",
  },
  {
    label: "Forecast",
    value: "future_prediction",
    icon: "mdi-trending-up",
    subtitle: "Volume forecasting",
  },
  {
    label: "Report",
    value: "report",
    icon: "mdi-file-chart-outline",
    subtitle: "Generate PDF reports",
  },
  {
    label: "Chart",
    value: "chart",
    icon: "mdi-chart-bar",
    subtitle: "Visualize data as charts",
  },
  {
    label: "Image",
    value: "image",
    icon: "mdi-image-outline",
    subtitle: "Generate images",
  },
  {
    label: "Formatter",
    value: "structured",
    icon: "mdi-table",
    subtitle: "Format structured output",
  },
] as const;

export type ToolValue = (typeof TOOLS)[number]["value"];

// ─── Composable ───────────────────────────────────────────────────────────────
export function useToolSelector(initial: ToolValue[] = ["prediction"]) {
  const selectedTools = ref<ToolValue[]>(initial);

  function toggleTool(value: ToolValue) {
    const idx = selectedTools.value.indexOf(value);
    if (idx === -1) selectedTools.value.push(value);
    else selectedTools.value.splice(idx, 1);
  }

  const selectedToolsLabel = computed(() =>
    selectedTools.value.length === 0
      ? "Select tools"
      : selectedTools.value
          .map((v) => TOOLS.find((t) => t.value === v)?.label)
          .join(" · "),
  );

  return { selectedTools, selectedToolsLabel, toggleTool };
}
