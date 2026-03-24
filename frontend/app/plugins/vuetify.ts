import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.min.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: "lightTheme",
      themes: {
        lightTheme: {
          dark: false,
          colors: {
            primary: "#1b5875",
            background: "#FFFFFF",
          },
        },
        darkTheme: {
          dark: true,
          colors: {
            primary: "#1b5875",
            background: "#121212",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
