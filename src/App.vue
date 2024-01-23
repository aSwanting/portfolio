<template>
  <AppHeader class="component header" />
  <AppContent class="component content" />
  <AppFooter class="component footer" />
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppContent from "./components/AppContent.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppContent,
    AppFooter,
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
  background-color: rgb(186, 255, 238);
}
.component {
  &.content {
    padding: 30px;
    flex-grow: 1;
  }
}
</style>
