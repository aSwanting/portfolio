import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./pages/AppHome.vue";
import AppAbout from "./pages/AppAbout.vue";
import AppBackendItems from "./pages/AppBackendItems.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory("/portfolio/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: AppHome,
    },
    {
      path: "/about",
      name: "about",
      component: AppAbout,
    },
    {
      path: "/backend",
      name: "backend",
      component: AppBackendItems,
    },
    {
      path: "/:wildPath(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export { router };
