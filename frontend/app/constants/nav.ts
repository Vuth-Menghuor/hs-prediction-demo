import type { NavItemProps } from "~/types";

export const NAV_ITEMS: NavItemProps[] = [
  {
    value: "dashboard",
    title: "Dashboard",
    icon: "lucide:layout-dashboard",
    to: "/",
  },
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
    ],
  },
  {
    value: "chat-test",
    title: "Qwen Chat",
    icon: "lucide:message-circle",
    to: "/chat-test",
  },
];

export const SUPPORT_ITEMS: NavItemProps[] = [
  { value: "chat", title: "Chat", icon: "lucide:message-square" },
  { value: "email", title: "Email", icon: "lucide:mail" },
  { value: "support", title: "Support", icon: "lucide:info" },
];

export const OTHER_ITEMS: NavItemProps[] = [
  {
    value: "charts",
    title: "Charts",
    icon: "lucide:chart-pie",
    to: "/",
    children: [
      {
        value: "line-chart",
        title: "Line Chart",
        icon: "",
        to: "/",
      },
    ],
  },
  { value: "settings", title: "Settings", icon: "lucide:settings" },
];
