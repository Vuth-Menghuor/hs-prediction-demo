import type {
  FuturePredictionData,
  HSPredictionData,
  OCRData,
  StreamChunk,
  StructuredOutputData,
  ToolResult,
} from "~/types";

// Chat / stream card
export function buildChatClipboard(tool: ToolResult): string {
  return (tool.streamChunks ?? []).map((c: StreamChunk) => c.chunk).join("");
}

// OCR card
export function buildOCRClipboard(tool: ToolResult<OCRData>): string {
  return tool.data?.text ?? "";
}

// HS prediction card
export function buildHSClipboard(tool: ToolResult<HSPredictionData>): string {
  return [
    `HS Code: ${tool.data?.hsCode ?? "----"}`,
    `Confidence: ${tool.data?.confidence ? Math.round(tool.data.confidence * 100) + "%" : "----"}`,
  ].join("\n");
}

// Future prediction card
export function buildFuturePredictionClipboard(
  tool: ToolResult<FuturePredictionData>,
): string {
  return [
    `Predicted Volume: ${tool.data?.predictedVolume ?? "—"}`,
    `Year: ${tool.data?.year ?? "—"}`,
  ].join("\n");
}

// Strucutured response card
export function buildStructuredClipboard(
  tool: ToolResult<StructuredOutputData>,
): string {
  const output = tool.data?.formattedOutput;
  if (!output) return "";

  return Object.entries(output)
    .map(([key, value]) => `${key}: ${value ?? "—"}`)
    .join("\n");
}
