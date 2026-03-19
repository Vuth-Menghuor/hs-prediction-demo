<template>
  <v-app-bar elevated class="top-bar">
    <template #prepend>
      <v-app-bar-nav-icon />
    </template>

    <v-spacer />

    <!-- Theme Toggle -->
    <ThemeDialog />

    <!-- More actions -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon icon="mdi-dots-vertical" />
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="handleLogout">
          <template #prepend>
            <v-icon icon="mdi-logout" />
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import ThemeDialog from "~/components/ui/ThemeDialog.vue";

const handleLogout = () => {
  // TODO: Implement logout logic
  console.log("Logout clicked");
};
</script>

<style scoped>
.top-bar {
  transition: all 0.3s ease;
}
</style>
