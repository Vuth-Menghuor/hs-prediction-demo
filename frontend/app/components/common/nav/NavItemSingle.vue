<template>
  <v-list-item
    :to="to"
    :value="value"
    :active="isActive"
    base-color="transparent"
    class="!px-3 !rounded-lg transition-all duration-200"
    :class="isActive ? activeBg : hoverBg"
    density="compact"
    @click="$emit('click', value)"
  >
    <template #prepend>
      <Icon
        :name="icon"
        :size="19"
        class="mr-3 shrink-0 transition-colors duration-200"
        :class="isActive ? activeIcon : inactiveIcon"
      />
    </template>
    <v-list-item-title
      v-if="showTitle"
      class="!text-sm !font-medium tracking-tight"
      :class="isActive ? activeText : mutedText"
    >
      {{ title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script setup lang="ts">
defineProps({
  value: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
  to: { type: String, default: undefined },
  showTitle: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
});

defineEmits(["click"]);

const { activeBg, hoverBg, activeText, mutedText, activeIcon, inactiveIcon } =
  useNavItemTheme();
</script>
