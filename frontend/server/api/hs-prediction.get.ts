import type { ApiResponse } from "~/types";
import mockResponseData from "../data/mockResponse.json";

export default defineEventHandler(async (event) => {
  try {
    // Return the mock response with a dynamic requestId
    const response: ApiResponse = {
      ...mockResponseData,
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };

    return response;
  } catch (error) {
    console.error("HS prediction error:", error);
    throw createError({
      statusCode: 500,
      message:
        error instanceof Error
          ? error.message
          : "Failed to process prediction request",
    });
  }
});
