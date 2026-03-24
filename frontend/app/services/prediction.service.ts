/**
 * Prediction Service
 * Handles all prediction-related API calls with error handling and type safety
 */

import { API_ENDPOINTS } from "~/config/api.config";
import type { ApiResponse } from "~/types";

export class PredictionService {
  /**
   * Fetch HS prediction from the API
   * @throws Error if the API call fails
   */
  static async fetchHSPrediction(): Promise<ApiResponse> {
    try {
      const response = await $fetch<ApiResponse>(API_ENDPOINTS.HS_PREDICTION, {
        method: "GET",
      });
      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      throw new Error(`HS Prediction failed: ${message}`);
    }
  }
}
