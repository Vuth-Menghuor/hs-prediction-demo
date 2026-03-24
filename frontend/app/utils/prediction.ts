import type { ConfidenceInfo, HSPrediction } from "~/types";

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatVolume(volume: number | undefined): string {
  if (volume === undefined) return "—";
  return new Intl.NumberFormat().format(volume);
}

// ─── Confidence ───────────────────────────────────────────────────────────────

export function getConfidenceInfo(
  confidence: number | undefined,
): ConfidenceInfo {
  const percent = confidence ? Math.round(confidence * 100) : 0;

  if (percent >= 90) {
    return {
      level: "high",
      percent,
      label: "High confidence — reliable",
      color: "success",
    };
  }
  if (percent >= 70) {
    return {
      level: "medium",
      percent,
      label: "Medium confidence — review recommended",
      color: "warning",
    };
  }
  return {
    level: "low",
    percent,
    label: "Low confidence — manual check required",
    color: "error",
  };
}

// ─── Table row builders ───────────────────────────────────────────────────────

export function buildPredictionRows(prediction: HSPrediction | null) {
  return [
    {
      field: "HS Code",
      value: prediction?.hsCode ?? "—",
      source: "prediction" as const,
      large: true,
    },
    {
      field: "Confidence",
      value:
        prediction?.confidence !== undefined
          ? `${Math.round(prediction.confidence * 100)}%`
          : "—",
      source: "prediction" as const,
    },
  ];
}
