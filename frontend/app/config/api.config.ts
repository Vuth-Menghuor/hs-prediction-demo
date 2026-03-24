export const API_ENDPOINTS = {
  HS_PREDICTION: "/api/hs-prediction",
  OLLAMA_CHAT: "/api/ollama/chat",
} as const;

export const API_CONFIG = {
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
} as const;
