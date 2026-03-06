import type { ConfidenceInfo } from "~/types";

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

export function getStatusColor(status: string | undefined): string {
  return status === "success" ? "success" : "error";
}
