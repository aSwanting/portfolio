<template>
  <section class="app-content">
    <div class="container">
      <h1>About</h1>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-content {
  overflow: hidden;
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    h1 {
      color: rgba(55, 63, 60, 0.7);
      font-size: 42px;
      text-transform: uppercase;
      text-align: center;
      font-weight: 300;
      margin-bottom: 24px;
    }
    h2 {
      color: rgba(55, 63, 60, 0.4);
      font-size: 24px;
      text-transform: uppercase;
      text-align: center;
      font-weight: 300;
      padding: 30px;
    }
  }
}
</style>
