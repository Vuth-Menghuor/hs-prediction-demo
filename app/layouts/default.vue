<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      :width="290"
      class="bg-white"
    >
      <div class="px-4 pt-6 py-2">
        <div class="flex items-center gap-3">
          <v-avatar :size="40">
            <v-img src="/gdce-seal.png" alt="Customs AI Assistant Logo" />
          </v-avatar>
          <div class="flex-1">
            <span
              class="font-bold text-xl tracking-wide font-nekst text-gray-900"
            >
              Customs AI
            </span>
          </div>
        </div>
      </div>

      <div class="px-4 py-2 mt-2">
        <p class="text-xs font-normal text-gray-400 uppercase tracking-widest">
          Menu
        </p>
      </div>

      <v-list nav class="!px-4" lines="default">
        <NavItem
          v-for="item in navItems"
          :key="item.value"
          v-bind="item"
          :show-title="true"
          :is-active="activeItem === item.value"
          :active-child="activeChild"
          @click="setActive"
          @child-click="setActiveChild"
        />
      </v-list>

      <div class="px-4 py-2 mt-2">
        <p class="text-xs font-normal text-gray-400 uppercase tracking-widest">
          Support
        </p>
      </div>

      <v-list nav class="!px-4" lines="default">
        <NavItem
          v-for="item in supportItems"
          :key="item.value"
          v-bind="item"
          :show-title="true"
          :is-active="activeItem === item.value"
          :active-child="activeChild"
          @click="setActive"
          @child-click="setActiveChild"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import NavItem from "~/components/common/nav/NavItem.vue";

const drawer = ref(true);
const activeItem = ref(null);
const activeChild = ref(null);

function setActive(value) {
  activeItem.value = value;
  activeChild.value = null; // clear child when parent is clicked
}

function setActiveChild(value) {
  activeChild.value = value;
  activeItem.value = null; // clear parent when child is clicked
}

const navItems = [
  {
    value: "home",
    title: "AI Assistant",
    icon: "lucide:bot",
    to: "/",

    children: [
      {
        value: "text-gen",
        title: "Text Generator",
        icon: "lucide:type",
        to: "/",
      },
      {
        value: "image-gen",
        title: "Image Generator",
        icon: "lucide:image",
        to: "/",
      },
      {
        value: "code-gen",
        title: "Code Generator",
        icon: "lucide:code-2",
        to: "/",
      },
      {
        value: "video-gen",
        title: "Video Generator",
        icon: "lucide:video",
        to: "/",
      },
    ],
  },
  {
    value: "chat-test",
    title: "Qwen Chat",
    icon: "lucide:message-circle",
    to: "/chat-test",
  },
];

const supportItems = [
  { value: "chat", title: "Chat", icon: "lucide:message-circle" },
  { value: "email", title: "Email", icon: "lucide:mail" },
  { value: "support-ticket", title: "Support Ticket", icon: "lucide:ticket" },
];
</script>
