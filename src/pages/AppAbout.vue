<template>
  <section class="app-content">
    <div class="container">
      <h1>About</h1>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      API_URL: "http://127.0.0.1:8000/api",
    };
  },
  methods: {
    fetch() {
      axios.get(`${this.API_URL}/items`).then((res) => {
        this.items = res.data.results;
      });
    },
  },
  created() {
    this.fetch();
  },
};
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
