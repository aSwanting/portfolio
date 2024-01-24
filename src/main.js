import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "@fontsource-variable/montserrat";

createApp(App).use(router).mount("#app");
