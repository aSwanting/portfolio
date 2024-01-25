import { createRouter, createWebHistory } from "vue-router";

import AppHome from "./pages/AppHome.vue";
import AppAbout from "./pages/AppAbout.vue";
import AppBackendItems from "./pages/AppBackendItems.vue";
import Circles from "./pages/Circles.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory("/portfolio/"),
  routes: [
    {
      path: "/",
      name: "home",
      label: "Home",
      component: AppHome,
    },
    {
      path: "/about",
      name: "about",
      label: "About",
      component: AppAbout,
    },
    {
      path: "/backend",
      name: "backend",
      label: "Backend Items",
      component: AppBackendItems,
    },
    {
      path: "/circles",
      name: "circles",
      label: "Circles!!",
      component: Circles,
    },
    {
      path: "/:wildPath(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export { router };
