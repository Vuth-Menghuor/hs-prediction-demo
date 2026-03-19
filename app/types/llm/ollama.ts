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
