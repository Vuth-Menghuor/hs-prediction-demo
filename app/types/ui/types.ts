export type ViewMode = "Card" | "Table";

export type ConfidenceLevel = "high" | "medium" | "low";

export interface ConfidenceInfo {
  level: ConfidenceLevel;
  percent: number;
  label: string;
  color: string;
}
