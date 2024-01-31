<template>
  <div class="card-wrapper">
    <div class="bread-card" v-for="i in 100">{{ breadMap[i].cnome }}</div>
  </div>
</template>

<script>
import breadMap from "../bread-map.json";
import axios from "axios";

export default {
  data() {
    return {
      breadMap: breadMap,
      API_URL: "https://api.tomtom.com/search/2/geometryFilter.json",
      API_KEY: "qD5AjlcGdPMFjUKdDAYqT7xYi3yIRo3c",
      breadList: null,
    };
  },
  mounted() {
    console.log(this.breadMap.slice(0, 10));
    axios
      .get(this.API_URL, {
        params: {
          key: this.API_KEY,
          geometryList: {
            type: "CIRCLE",
            position: "40.80558, -73.96548",
            radius: 100,
          },
          poiList: this.breadMap.slice(1, 10),
        },
      })
      .then((res) => {
        console.log(res);
      });
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  overflow: auto;
  height: 100%;
  .bread-card {
    border: 1px solid rgb(35, 49, 63);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
  }
}
</style>
