<template>
  <section class="app-content">
    <div class="container">
      <h1>Content</h1>
      <div class="content-wrapper">
        <ul v-if="items.length > 0">
          <li v-for="item in items">
            <a href="">{{ item.name }}</a>
          </li>
        </ul>
        <p v-else>NADA</p>
      </div>
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
      color: rgba(55, 63, 60, 0.671);
      font-size: 42px;
      text-transform: uppercase;
      text-align: center;
      font-weight: 300;
      margin-bottom: 24px;
    }
    .content-wrapper {
      overflow: hidden;
      border: 6px solid rgba(0, 185, 108, 0.5);
      border-radius: 25px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);

      ul {
        height: 100%;
        overflow: auto;
        padding: 40px;
        text-align: center;
        li {
          a {
            display: block;
            padding: 24px;
            transition: all 200ms;
            &:hover {
              color: rgba(28, 109, 110, 0.8);
              font-weight: 700;
              background-color: rgba(0, 139, 86, 0.1);
            }
          }
          &:not(:last-child) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}
</style>
