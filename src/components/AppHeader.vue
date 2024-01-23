<template>
  <header>
    <div class="container">
      <nav>
        <div class="nav-menu">
          <a href="">Logo</a>
        </div>
        <ul class="nav-menu">
          <li v-for="item in navItems" class="nav-item">
            <a class="nav-link" :href="item.url">{{ item.name }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          name: "Menu 1",
          url: "#",
        },
        {
          name: "Menu 2",
          url: "#",
        },
        {
          name: "Menu 3",
          url: "#",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  color: rgb(145, 145, 145);
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
