/**
 * Home Page Configuration
 * Centralized configuration for static data and UI elements
 */

export interface QuickAction {
  label: string;
  icon: string;
}

export interface RecentChat {
  title: string;
  time: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "Create image", icon: "mdi-image-outline" },
  { label: "Make a plan", icon: "mdi-file-document-outline" },
  { label: "Summarize text", icon: "mdi-text-box-outline" },
  { label: "Help me write", icon: "mdi-pencil-outline" },
  { label: "Brainstorm", icon: "mdi-lightbulb-outline" },
];

export const RECENT_CHATS: RecentChat[] = [
  { title: "Poem of the past", time: "23 hours ago" },
  { title: "Assistance request", time: "23 hours ago" },
  { title: "Analytica ideas", time: "23 hours ago" },
];

export const WEATHER_DATA = {
  location: "Pekanbaru",
  temperature: "25°C",
  condition: "Drizzle",
  high: "31°",
  low: "24°",
  icon: "mdi-weather-cloudy",
};

export const GREETING = {
  userName: "Iqbal",
  message: "Good evening",
  subtitle: "How can I help you?",
};

export const ANNOUNCEMENT = {
  badge: "New",
  title: "Context-Aware Chat",
  description:
    "Your AI remembers past interactions to provide more relevant and personalized responses.",
};
