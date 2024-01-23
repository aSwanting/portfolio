<template>
  <header>
    <div class="container">
      <nav>
        <div class="nav-menu">
          <a href="">Logo</a>
        </div>
        <ul class="nav-menu">
          <li class="nav-item"><a class="nav-link" href="">Menu 1</a></li>
          <li class="nav-item"><a class="nav-link" href="">Menu 2</a></li>
          <li class="nav-item"><a class="nav-link" href="">Menu 3</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {};
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
