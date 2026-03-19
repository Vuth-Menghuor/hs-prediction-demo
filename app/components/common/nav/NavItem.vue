<template>
  <v-list-group v-if="children && children.length" :value="value">
    <template #activator="{ props }">
      <v-list-item
        :to="to"
        v-bind="props"
        :active="isActive || isChildActive"
        active-color="transparent"
        class="!px-3 !py-0 transition-all duration-200 ease-in-out !rounded-lg"
        :class="
          isActive || isChildActive ? '!bg-gray-100' : 'hover:!bg-gray-100'
        "
      >
        <template #prepend>
          <Icon
            :name="icon"
            :size="19"
            class="mr-3 shrink-0 transition-colors duration-200"
            :class="
              isActive || isChildActive ? 'text-gray-900' : 'text-gray-600'
            "
          />
        </template>

        <v-list-item-title
          v-if="showTitle"
          class="!text-sm !font-medium tracking-tight transition-all duration-200 ease-in-out"
          :class="
            isActive || isChildActive ? '!text-gray-900' : '!text-gray-600'
          "
        >
          {{ title }}
        </v-list-item-title>
      </v-list-item>
    </template>

    <v-list-item
      v-for="child in children"
      :to="child.to"
      :key="child.value"
      :value="child.value"
      :active="activeChild === child.value"
      active-color="transparent"
      class="!pl-10 !pr-3 !py-0 transition-all duration-200 ease-in-out !rounded-lg"
      :class="
        activeChild === child.value ? '!bg-gray-100' : 'hover:!bg-gray-50'
      "
      @click="$emit('child-click', child.value)"
    >
      <v-list-item-title
        v-if="showTitle"
        class="!text-sm !font-medium tracking-tight transition-all duration-200 ease-in-out"
        :class="
          activeChild === child.value ? '!text-gray-900' : '!text-gray-500'
        "
      >
        {{ child.title }}
      </v-list-item-title>
    </v-list-item>
  </v-list-group>

  <v-list-item
    v-else
    :to="to"
    :value="value"
    :active="isActive"
    active-color="transparent"
    class="!px-3 !py-0 transition-all duration-200 ease-in-out !rounded-lg"
    :class="isActive ? '!bg-gray-50' : 'hover:!bg-gray-50'"
    @click="$emit('click', value)"
  >
    <template #prepend>
      <Icon
        :name="icon"
        :size="19"
        class="mr-3 shrink-0 transition-colors duration-200"
        :class="isActive ? 'text-gray-900' : 'text-gray-500'"
      />
    </template>

    <v-list-item-title
      v-if="showTitle"
      class="!text-sm !font-medium tracking-tight transition-all duration-200 ease-in-out"
      :class="isActive ? '!text-gray-900' : '!text-gray-500'"
    >
      {{ title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script setup>
const props = defineProps({
  value: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
  showTitle: { type: Boolean, default: true },
  isActive: { type: Boolean, default: false },
  badge: { type: String, default: null },
  children: { type: Array, default: () => [] },
  activeChild: { type: String, default: null },
});

defineEmits(["click", "child-click"]);

const isChildActive = computed(() =>
  props.children.some((c) => c.value === props.activeChild),
);
</script>
