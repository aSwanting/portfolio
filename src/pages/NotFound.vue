<template>
  <section class="app-content">
    <div class="container">
      <h1>4</h1>
      <img src="/spacegab.gif" alt="" />
      <h1>4</h1>
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
    // flex-direction: column;
    justify-content: space-around;
    align-items: center;
    // gap: 50px;
    height: 100%;
    h1 {
      color: rgba(55, 63, 60, 0.7);
      font-size: 100px;
      text-transform: uppercase;
      // text-align: center;
      font-weight: 800;
      // margin-bottom: 24px;
    }
    h2 {
      color: rgba(55, 63, 60, 0.4);
      font-size: 24px;
      text-transform: uppercase;
      text-align: center;
      font-weight: 300;
      padding: 30px;
    }

    img {
      width: 60%;
      aspect-ratio: 1;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>
