-# Customs AI Assistant

This project (previously `hs-prediction-demo`) is an HS-code classification and assistant chatbot.

Short summary:
- Display name: "Customs AI Assistant"
- Package name: `customs-ai-assistant`
- Built with Nuxt 4, Vue 3 and Vuetify
- Uses an Ollama service to interpret prompts and orchestrate tool responses

Quick start

1. Install dependencies

```bash
pnpm install
```

2. Run development server

```bash
pnpm dev
```

Notes

- To change the displayed title in the browser tab, edit `nuxt.config.ts` (app.head.title).
- The server endpoint `/api/hs-prediction` accepts POST requests with `{ prompt, tools }` and returns a structured `ApiResponse`.
- The package name in `package.json` is a safe kebab-case value suitable for tooling. If you plan to publish to npm, update it accordingly.
