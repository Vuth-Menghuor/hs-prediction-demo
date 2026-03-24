<template>
  <div>
    <div class="px-4 py-2 mt-2">
      <p class="text-xs font-normal text-gray-400 uppercase tracking-wide">
        {{ label }}
      </p>
    </div>
    <v-list nav density="compact" class="!px-4 !bg-transparent">
      <NavItem
        v-for="item in items"
        :key="item.value"
        v-bind="item"
        :show-title="true"
        :is-active="activeItem === item.value"
        :active-child="activeChild"
        @click="$emit('click', $event)"
        @child-click="$emit('child-click', $event)"
      />
    </v-list>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { NavItemProps } from "~/types";
import NavItem from "./NavItem.vue";

defineProps({
  label: { type: String, required: true },
  items: { type: Array as PropType<NavItemProps[]>, required: true },
  activeItem: { type: String as PropType<string | null>, default: null },
  activeChild: { type: String as PropType<string | null>, default: null },
});

defineEmits(["click", "child-click"]);
</script>
