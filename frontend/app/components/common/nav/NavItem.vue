<template>
  <NavItemGroup
    v-if="children?.length"
    v-bind="props"
    @child-click="$emit('child-click', $event)"
  />
  <NavItemSingle v-else v-bind="props" @click="$emit('click', $event)" />
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import NavItemGroup from "./NavItemGroup.vue";
import NavItemSingle from "./NavItemSingle.vue";

interface NavChild {
  value: string;
  title: string;
  icon?: string;
  to?: string;
}

const props = defineProps({
  value: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
  to: { type: String, default: undefined },
  showTitle: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
  children: { type: Array as PropType<NavChild[]>, default: () => [] },
  activeChild: { type: String, default: null },
});

defineEmits(["click", "child-click"]);
</script>
