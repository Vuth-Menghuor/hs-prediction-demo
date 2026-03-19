<template>
  <div class="flex flex-col h-screen bg-white font-sans">
    <!-- Header -->
    <div
      class="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white shrink-0"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3b82f6"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </div>
        <div>
          <p
            class="text-sm font-semibold text-slate-800 leading-tight tracking-tight"
          >
            Ollama
          </p>
          <p class="text-[11px] text-slate-400 font-mono leading-tight">
            Local AI · llama3.2
          </p>
        </div>
      </div>

      <div
        class="flex items-center gap-1.5 bg-green-50 border border-green-200 px-3 py-1 rounded-full"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span
          class="text-[11px] font-mono font-medium text-green-700 tracking-wide"
          >online</span
        >
      </div>
    </div>

    <!-- Messages -->
    <div
      class="flex-1 overflow-y-auto px-6 py-7 bg-slate-50 scroll-smooth"
      ref="messagesRef"
    >
      <!-- Empty state -->
      <div
        v-if="messages.length === 0"
        class="flex flex-col items-center justify-center h-full gap-2 min-h-64"
      >
        <div
          class="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-300 mb-1"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
            />
          </svg>
        </div>
        <p class="text-sm font-medium text-slate-400">Start a conversation</p>
        <p class="text-xs font-mono text-slate-300">
          Running locally on your machine via Ollama
        </p>
      </div>

      <!-- Message list -->
      <transition-group name="msg" tag="div" class="flex flex-col">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="flex items-end gap-2 mb-3"
          :class="message.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
        >
          <!-- Avatar -->
          <div
            class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            :class="
              message.role === 'user'
                ? 'bg-blue-500 border border-blue-300 text-white'
                : 'bg-slate-100 border border-slate-200 text-slate-500'
            "
          >
            <svg
              v-if="message.role === 'assistant'"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a3 3 0 110 6 3 3 0 010-6zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"
              />
            </svg>
            <svg
              v-else
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
              />
            </svg>
          </div>

          <!-- Bubble -->
          <div
            class="max-w-[65%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl break-words"
            :class="
              message.role === 'user'
                ? 'bg-blue-500 text-white rounded-br-sm shadow-sm shadow-blue-200'
                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
            "
          >
            {{ message.content }}
          </div>
        </div>
      </transition-group>

      <!-- Typing indicator -->
      <div v-if="loading" class="flex items-end gap-2 mb-3">
        <div
          class="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 3a3 3 0 110 6 3 3 0 010-6zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"
            />
          </svg>
        </div>
        <div
          class="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5"
        >
          <span class="typing-dot w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span
            class="typing-dot w-1.5 h-1.5 rounded-full bg-slate-300"
            style="animation-delay: 0.15s"
          />
          <span
            class="typing-dot w-1.5 h-1.5 rounded-full bg-slate-300"
            style="animation-delay: 0.3s"
          />
        </div>
      </div>
    </div>

    <!-- Error -->
    <transition name="fade">
      <div
        v-if="error"
        class="mx-5 mb-1 flex items-center gap-2 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-xl text-red-500 text-sm shrink-0"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="shrink-0"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </svg>
        {{ error }}
      </div>
    </transition>

    <!-- Input -->
    <div class="shrink-0 px-5 pt-3 pb-2.5 border-t border-slate-200 bg-white">
      <div
        class="flex items-end gap-2.5 bg-slate-50 border rounded-2xl px-4 py-2.5 transition-all duration-150"
        :class="
          focused
            ? 'border-blue-300 bg-white ring-4 ring-blue-500/[0.06]'
            : 'border-slate-200'
        "
      >
        <textarea
          v-model="inputMessage"
          class="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400 resize-none leading-relaxed min-h-6 max-h-44 overflow-y-auto py-0.5"
          placeholder="Message Ollama…"
          :disabled="loading"
          rows="1"
          @keydown.enter.exact.prevent="sendMessage"
          @input="autoResize"
          @focus="focused = true"
          @blur="focused = false"
          ref="inputRef"
        />
        <button
          class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-150"
          :class="
            canSend
              ? 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-sm shadow-blue-200'
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          "
          :disabled="!canSend"
          @click="sendMessage"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
      <p
        class="text-center text-[10.5px] font-mono text-slate-300 tracking-wide mt-2"
      >
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });

import { useOllamaChat } from "~/composables/useOllamaChat";

const {
  messages,
  loading,
  error,
  sendMessage: sendChatMessage,
} = useOllamaChat();

const inputMessage = ref("");
const messagesRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLTextAreaElement | null>(null);
const focused = ref(false);

const canSend = computed(
  () => inputMessage.value.trim().length > 0 && !loading.value,
);

const autoResize = () => {
  const el = inputRef.value;
  if (!el) return;
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 176) + "px";
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value)
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
  });
};

watch(messages, scrollToBottom, { deep: true });
watch(loading, scrollToBottom);

const sendMessage = async () => {
  if (!canSend.value) return;
  const message = inputMessage.value.trim();
  inputMessage.value = "";
  nextTick(() => {
    if (inputRef.value) inputRef.value.style.height = "auto";
  });
  try {
    await sendChatMessage(message);
  } catch (err) {
    console.error("Failed to send message:", err);
  }
};
</script>

<style scoped>
.typing-dot {
  animation: tdot 1.3s ease-in-out infinite;
}

@keyframes tdot {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

.msg-enter-active {
  transition: all 0.24s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.msg-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
