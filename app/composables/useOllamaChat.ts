import { ref } from "vue";

import type {
  OllamaChatMessage,
  OllamaChatResponse,
} from "~~/server/types/ollama.types";

export function useOllamaChat(defaultModel = "qwen3.5:0.8b") {
  const messages = ref<OllamaChatMessage[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastResponse = ref<OllamaChatResponse | null>(null);

  const sendMessage = async (content: string, model?: string) => {
    loading.value = true;
    error.value = null;

    try {
      // Add user message to history
      messages.value.push({
        role: "user",
        content,
      });

      // Send to API
      const response = await $fetch<{
        success: boolean;
        data: OllamaChatResponse;
        message: string;
      }>("/api/ollama/chat", {
        method: "POST",
        body: {
          messages: messages.value,
          model: model || defaultModel,
        },
      });

      lastResponse.value = response.data;

      // Add assistant response to history
      messages.value.push({
        role: "assistant",
        content: response.message,
      });

      return response;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : "Failed to send message";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearHistory = () => {
    messages.value = [];
    lastResponse.value = null;
    error.value = null;
  };

  return {
    messages,
    loading,
    error,
    lastResponse,
    sendMessage,
    clearHistory,
  };
}
