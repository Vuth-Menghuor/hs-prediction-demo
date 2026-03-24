<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" permanent :width="290">
      <div class="px-4 pt-4 py-4">
        <div class="flex items-center gap-3">
          <v-avatar :size="40">
            <v-img src="/gdce-seal.png" alt="Customs AI Assistant Logo" />
          </v-avatar>
          <span class="font-bold text-xl tracking-wide font-nekst">
            Customs AI
          </span>
        </div>
      </div>

      <NavSection
        label="Menu"
        :items="NAV_ITEMS"
        :active-item="activeItem"
        :active-child="activeChild"
        @click="setActive"
        @child-click="setActiveChild"
      />

      <NavSection
        label="Support"
        :items="SUPPORT_ITEMS"
        :active-item="activeItem"
        :active-child="activeChild"
        @click="setActive"
        @child-click="setActiveChild"
      />

      <NavSection
        label="Others"
        :items="OTHER_ITEMS"
        :active-item="activeItem"
        :active-child="activeChild"
        @click="setActive"
        @child-click="setActiveChild"
      />
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNavState } from "~/composables/useNavState";
import { NAV_ITEMS, SUPPORT_ITEMS, OTHER_ITEMS } from "~/constants/nav";
import NavSection from "~/components/common/nav/NavSection.vue";

const drawer = ref(true);
const { activeItem, activeChild, setActive, setActiveChild } = useNavState();
</script>
