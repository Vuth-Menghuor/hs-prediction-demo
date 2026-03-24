// ─── Agent API (wire format) ──────────────────────────────────────────────────
export type {
  ToolType,
  ToolStatus,
  ToolMode,
  StreamChunk,
  ToolResult,
  ApiResponse,
} from "./agent/api";

// ─── Tool data shapes ─────────────────────────────────────────────────────────
export type { WorkflowData } from "./tool/workflow";
export type { OCRData } from "./tool/ocr";
export type { HSPredictionData, FuturePredictionData } from "./tool/prediction";
export type { StructuredOutputData } from "./tool/structured";

// ─── HS prediction domain ─────────────────────────────────────────────────────
// Re-export legacy aliases so existing components don't break
export type { HSPrediction, PredictionMeta } from "./prediction/hs";

// ─── UI types ─────────────────────────────────────────────────────────────────
export type { ViewMode, ConfidenceLevel, ConfidenceInfo } from "./ui/types";

// ─── Chat types ───────────────────────────────────────────────────────────────
export type { ChatMessage, ChatResponse } from "./chat/message";

// ─── LLM / Ollama types ───────────────────────────────────────────────────────
export type { OllamaChatMessage, OllamaMetrics } from "./llm/ollama";

// ─── Navigation types ───────────────────────────────────────────────────────
export interface NavChild {
  value: string;
  title: string;
  icon?: string;
  to?: string;
}

export interface NavItemProps {
  value: string;
  title: string;
  icon: string;
  to?: string;
  showTitle?: boolean;
  isActive?: boolean;
  children?: NavChild[];
  activeChild?: string | null;
}
