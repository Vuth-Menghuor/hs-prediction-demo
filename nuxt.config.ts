import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    // server-side only
    ollama: {
      baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
      defaultModel: process.env.OLLAMA_DEFAULT_MODEL || "qwen3.5:0.8b",
    },
  },

  modules: ["@nuxt/icon"],

  css: ["~/assets/css/tailwind.css"],

  build: { transpile: ["vuetify"] },

  vite: {
    plugins: [tailwindcss()] as any[],
  },
});
