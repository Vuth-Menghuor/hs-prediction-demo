export type ToolType =
  | "workflow"
  | "chat"
  | "ocr"
  | "prediction"
  | "report"
  | "chart"
  | "image"
  | "structured"
  | "tool";

export type ToolStatus = "success" | "pending" | "error";

export type ToolMode = "sync" | "stream" | "async";

// Stream chunk used by streaming tools (e.g. RAG / chat)
export interface StreamChunk {
  chunk: string;
  done: boolean;
}

export interface ToolResult<T = unknown> {
  toolName: string;
  type: ToolType;
  mode: ToolMode;
  status: ToolStatus;
  data?: T;
  streamChunks?: StreamChunk[];
  taskId?: string;
  error?: string | null;
}

export interface ApiResponse {
  requestId: string;
  mode: ToolMode;
  status: ToolStatus;
  tools: ToolResult[];
  timestamp?: string;
  error?: string | null;
}
