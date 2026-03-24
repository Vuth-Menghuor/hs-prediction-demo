<template>
  <v-list-group :value="value">
    <template #activator="{ props }">
      <v-list-item
        :to="to"
        v-bind="props"
        :active="isActive || isChildActive"
        base-color="transparent"
        class="!px-3 !py-0 !rounded-lg transition-all duration-200"
        :class="isActive || isChildActive ? activeBg : hoverBg"
        density="compact"
      >
        <template #prepend>
          <Icon
            :name="icon"
            :size="22"
            class="mr-3 shrink-0 transition-colors duration-200"
            :class="isActive || isChildActive ? activeIcon : inactiveIcon"
          />
        </template>
        <v-list-item-title
          v-if="showTitle"
          class="!text-sm !font-medium tracking-tight"
          :class="isActive || isChildActive ? activeText : inactiveText"
        >
          {{ title }}
        </v-list-item-title>
      </v-list-item>
    </template>

    <div class="ml-4 pl-3 pt-2 border-l" :class="borderLine">
      <v-list-item
        v-for="child in children"
        :key="child.value"
        :to="child.to"
        :value="child.value"
        :active="activeChild === child.value"
        base-color="transparent"
        class="!pl-4 !rounded-lg transition-all duration-200"
        :class="activeChild === child.value ? activeBg : hoverBg"
        density="compact"
        @click="$emit('child-click', child.value)"
      >
        <v-list-item-title
          v-if="showTitle"
          class="!text-sm !font-medium tracking-tight"
          :class="activeChild === child.value ? activeText : mutedText"
        >
          {{ child.title }}
        </v-list-item-title>
      </v-list-item>
    </div>
  </v-list-group>
</template>

<script setup lang="ts">
import { computed, type PropType } from "vue";
import { useNavItemTheme } from "~/composables/useNavItemTheme";

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

defineEmits(["child-click"]);

const isChildActive = computed(() =>
  props.children.some((c) => c.value === props.activeChild),
);

const {
  activeBg,
  hoverBg,
  activeText,
  inactiveText,
  mutedText,
  activeIcon,
  inactiveIcon,
  borderLine,
} = useNavItemTheme();
</script>
