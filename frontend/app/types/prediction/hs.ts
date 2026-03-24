import type { ToolStatus } from "../agent/api";

export interface HSPrediction {
  hsCode: string;
  confidence: number;
}

export interface PredictionMeta {
  requestId: string;
  mode: string;
  status: ToolStatus;
}
