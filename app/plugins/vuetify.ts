import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.min.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: "mdi",
    },
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: "#2563eb",
            secondary: "#7c3aed",
            success: "#16a34a",
            warning: "#d97706",
            error: "#dc2626",
            info: "#0284c7",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
