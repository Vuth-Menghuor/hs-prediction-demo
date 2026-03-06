<script setup lang="ts">
const { messages, loading, error, sendMessage, clearHistory } = useOllamaChat();

const userInput = ref("");

const handleSend = async () => {
  if (!userInput.value.trim()) return;

  try {
    await sendMessage(userInput.value);
    userInput.value = "";
  } catch (err) {
    console.error("Chat error:", err);
  }
};
</script>

<template>
  <div class="container mx-auto p-8 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">Ollama Chat Test (Qwen 3.5)</h1>

    <!-- Chat Messages -->
    <div class="bg-white rounded-lg shadow-lg p-4 mb-4 h-96 overflow-y-auto">
      <div v-if="messages.length === 0" class="text-gray-400 text-center py-8">
        Start a conversation...
      </div>

      <div v-for="(msg, idx) in messages" :key="idx" class="mb-4">
        <div
          :class="[
            'flex',
            msg.role === 'user' ? 'justify-end' : 'justify-start',
          ]"
        >
          <div
            :class="[
              'max-w-[70%] p-3 rounded-lg',
              msg.role === 'user'
                ? 'bg-blue-500 text-white rounded-br-none'
                : 'bg-gray-200 text-gray-800 rounded-bl-none',
            ]"
          >
            <div class="text-xs font-semibold mb-1 opacity-70">
              {{ msg.role === "user" ? "You" : "Qwen" }}
            </div>
            <div class="whitespace-pre-wrap">{{ msg.content }}</div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex justify-start mb-4">
        <div class="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none">
          <div class="flex space-x-2">
            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style="animation-delay: 0.1s"
            ></div>
            <div
              class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style="animation-delay: 0.2s"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      <strong>Error:</strong> {{ error }}
    </div>

    <!-- Input Area -->
    <div class="flex gap-2">
      <input
        v-model="userInput"
        type="text"
        placeholder="Type a message..."
        class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @keyup.enter="handleSend"
        :disabled="loading"
      />
      <button
        @click="handleSend"
        :disabled="loading || !userInput.trim()"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {{ loading ? "Sending..." : "Send" }}
      </button>
      <button
        @click="clearHistory"
        class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        :disabled="loading"
      >
        Clear
      </button>
    </div>

    <!-- API Test -->
    <div class="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 class="text-lg font-semibold mb-2">API Status</h2>
      <div class="text-sm text-gray-600">
        <p><strong>Endpoint:</strong> /api/ollama/chat</p>
        <p><strong>Model:</strong> qwen3.5:0.8b</p>
        <p><strong>Messages sent:</strong> {{ messages.length }}</p>
      </div>
    </div>
  </div>
</template>
