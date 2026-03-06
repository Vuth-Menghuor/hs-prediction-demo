import { ollamaService } from "~~/server/services/ollama.service";
import type { OllamaChatMessage } from "~~/server/types/ollama.types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { messages, model } = body as {
      messages: OllamaChatMessage[];
      model?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw createError({
        statusCode: 400,
        message: "Messages array is required",
      });
    }

    const response = await ollamaService.chat(messages, model);

    return {
      success: true,
      data: response,
      message: response.message.content,
    };
  } catch (error) {
    console.error("Ollama chat error:", error);
    throw createError({
      statusCode: 500,
      message:
        error instanceof Error
          ? error.message
          : "Failed to process chat request",
    });
  }
});
