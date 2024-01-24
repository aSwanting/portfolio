import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./pages/AppHome.vue";
import AppAbout from "./pages/AppAbout.vue";
import AppBackendItems from "./pages/AppBackendItems.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/portfolio/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/portfolio/about",
      name: "about",
      component: AppAbout,
    },
    {
      path: "/portfolio/backend",
      name: "backend",
      component: AppBackendItems,
    },
  ],
});

export { router };
