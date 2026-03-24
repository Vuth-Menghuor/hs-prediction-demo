import { computed } from "vue";
import type { Component } from "vue";
import type { ToolResult, ToolType } from "~/types";
import type { ToolValue } from "./useToolSelector";

import WorkflowCard from "~/components/tools/workflow/WorkflowCard.vue";
import ChatMessage from "~/components/tools/chat/ChatMessage.vue";
import OCRResult from "~/components/tools/ocr/OCRResult.vue";
import HSCard from "~/components/tools/prediction/HSCard.vue";
import FuturePredictionCard from "~/components/tools/prediction/FuturePredictionCard.vue";
import ReportStatus from "~/components/tools/report/ReportStatus.vue";
import ChartViewer from "~/components/tools/chart/ChartViewer.vue";
import ImageResult from "~/components/tools/image/ImageResult.vue";
import StructuredTable from "~/components/tools/structured/StructuredTable.vue";

// ─── Tool → component map ─────────────────────────────────────────────────────
const TOOL_COMPONENT_MAP: Partial<Record<ToolType, Component>> = {
  workflow: WorkflowCard,
  chat: ChatMessage,
  ocr: OCRResult,
  report: ReportStatus,
  chart: ChartViewer,
  image: ImageResult,
  structured: StructuredTable,
};

const FUTURE_PREDICTION = "Future Prediction";

// ─── Resolved tool shape (component resolved at computed-time, not render-time)
export interface ResolvedTool extends ToolResult {
  component: Component;
}

export function useToolResolver(
  selectedTools: Ref<ToolValue[]>,
  rawTools: Ref<ToolResult[]>,
) {
  // Resolve a single tool to its display component.
  function resolveComponent(tool: ToolResult): Component {
    if (tool.type === "prediction") {
      return tool.toolName === FUTURE_PREDICTION
        ? FuturePredictionCard
        : HSCard;
    }
    return TOOL_COMPONENT_MAP[tool.type] ?? HSCard;
  }

  // Single computed: filter by selected tools AND resolve components in one pass.
  // Avoids calling resolveComponent() on every template render cycle.
  const resolvedTools = computed<ResolvedTool[]>(() =>
    rawTools.value
      .filter((tool) =>
        tool.toolName === FUTURE_PREDICTION
          ? selectedTools.value.includes("future_prediction")
          : selectedTools.value.includes(tool.type as ToolValue),
      )
      .map((tool) => ({ ...tool, component: resolveComponent(tool) })),
  );

  return { resolvedTools };
}
