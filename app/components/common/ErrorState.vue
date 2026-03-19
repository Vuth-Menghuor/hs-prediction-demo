<template>
  <v-alert
    type="error"
    variant="tonal"
    :title="title"
    :text="message"
    class="rounded-2xl"
  >
    <template v-if="$slots.default" #append>
      <slot />
    </template>
  </v-alert>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message: string;
    title?: string;
  }>(),
  {
    title: "Something went wrong",
  },
);
</script>
