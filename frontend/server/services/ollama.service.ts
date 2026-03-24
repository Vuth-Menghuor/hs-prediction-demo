import type {
  OllamaChatRequest,
  OllamaChatResponse,
} from "../types/ollama.types";

export class OllamaService {
  private baseUrl: string;
  private defaultModel: string;

  constructor() {
    const config = useRuntimeConfig();
    this.baseUrl = config.ollama.baseUrl;
    this.defaultModel = config.ollama.defaultModel;
  }

  async chat(
    messages: OllamaChatRequest["messages"],
    model?: string,
  ): Promise<OllamaChatResponse> {
    const response = await $fetch<OllamaChatResponse>(
      `${this.baseUrl}/api/chat`,
      {
        method: "POST",
        body: {
          model: model || this.defaultModel,
          messages,
          stream: false,
          think: false,
        },
      },
    );

    return response;
  }

  async generate(prompt: string, model?: string): Promise<OllamaChatResponse> {
    const response = await $fetch<OllamaChatResponse>(
      `${this.baseUrl}/api/generate`,
      {
        method: "POST",
        body: {
          model: model || this.defaultModel,
          prompt,
          stream: false,
          think: false,
        },
      },
    );

    return response;
  }
}

export const ollamaService = new OllamaService();
