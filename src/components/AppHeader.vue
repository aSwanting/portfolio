<template>
  <header>
    <div class="container">
      <nav>
        <div class="nav-menu">
          <router-link class="nav-link" :to="{ name: 'home' }">
            Gabriel D'Amico
          </router-link>
        </div>
        <ul class="nav-menu">
          <li v-for="item in routes" class="nav-item">
            <router-link class="nav-link" :to="{ name: item.name }">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    routes: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
header {
  color: rgb(85, 85, 85);
  background-color: rgb(250, 250, 250);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-menu {
      display: flex;
      .nav-link {
        background-color: rgba(0, 0, 0, 0);
        padding: 20px;
        transition: all 200ms;
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
}
</style>
