<template>
  <section>
    <div class="container flex-center">
      <div class="flex-center"><h1>Content</h1></div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  div {
    border: 10px solid rgba(0, 0, 0, 0.2);
    border-radius: 80px;
    width: 100%;
    height: 80%;
    font-size: 28px;
    text-align: center;
    h1 {
      text-transform: uppercase;
      font-weight: 300;
      color: rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
