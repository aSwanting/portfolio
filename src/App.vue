<template>
  <AppHeader class="component header" :routes="routes" />
  <router-view class="component content"></router-view>
  <AppFooter class="component footer" />
</template>

<script>
import { router } from "./router";
import AppHeader from "./components/AppHeader.vue";
import AppContent from "./components/AppContent.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppContent,
    AppFooter,
  },
  methods: {
    routeMatch() {
      let path;
      if (this.routeQuery) {
        this.routeNames.includes(this.routeQuery)
          ? (path = this.routeQuery)
          : (path = "404");
        this.$router.push(path);
      }
    },
  },
  computed: {
    routes() {
      return router.options.routes;
    },
    routeNames() {
      return this.routes.map((route) => route.name);
    },
    routeQuery() {
      return window.location.search.replace("?", "");
    },
  },
  created() {
    this.routeMatch();
  },
};
</script>

<style lang="scss">
@use "./style/general.scss" as *;
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(221, 255, 248);
}
.component {
  &.content {
    padding: 30px;
    flex-grow: 1;
  }
}
</style>
