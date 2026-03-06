// ─── Raw API response types ───────────────────────────────────────────────────

export interface ToolResult<T = unknown> {
  toolName: string;
  type: string;
  mode: string;
  status: "success" | "error";
  data: T;
}

export interface ApiResponse {
  requestId: string;
  mode: string;
  status: "success" | "error";
  tools: ToolResult[];
}

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface HSPrediction {
  hsCode: string;
  confidence: number;
}

export interface StructuredOutput {
  productName: string;
  hsCode: string;
  category: string;
}

export interface PredictionMeta {
  requestId: string;
  mode: string;
  status: "success" | "error";
}

// ─── UI types ─────────────────────────────────────────────────────────────────

export type ViewMode = "Card" | "Table";

export type ConfidenceLevel = "high" | "medium" | "low";

export interface ConfidenceInfo {
  level: ConfidenceLevel;
  percent: number;
  label: string;
  color: string;
}

// ─── Chat types ───────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  requestId: string;
}

// ─── Ollama types ─────────────────────────────────────────────────────────────

export interface OllamaChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface OllamaMetrics {
  totalDuration?: number;
  loadDuration?: number;
  promptEvalCount?: number;
  promptEvalDuration?: number;
  evalCount?: number;
  evalDuration?: number;
}
