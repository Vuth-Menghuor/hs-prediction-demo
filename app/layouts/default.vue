<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      @click="rail = false"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://img.icons8.com/?size=100&id=FpVS74LDFYc2&format=png&color=000000"
        >
          <div class="flex items-center justify-between w-full">
            <span class="font-bold text-sm tracking-wide">HS Prediction</span>
            <Icon
              class="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              name="lucide:sidebar"
              @click.stop="rail = !rail"
              size="18"
            />
          </div>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list density="compact" nav class="mt-1">
        <v-list-item
          :title="!rail ? 'New Chat' : ''"
          value="new_chat"
          to="/chat/new"
          rounded="lg"
        >
          <template #prepend>
            <div class="mr-3 flex items-center">
              <Icon name="lucide:square-pen" size="18" />
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
const drawer = ref(true);
const rail = ref(true);
</script>
