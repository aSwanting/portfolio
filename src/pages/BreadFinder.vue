<template>
  <section>
    <div class="container">
      <div class="search-wrapper">
        <input class="query-input" type="text" v-model="breadQuery" />
        <div v-for="result in queryResults">
          <div class="query-result">
            <span>{{ result.address.freeformAddress }}</span>
            <span> ({{ result.position.lat }}</span>
            <span>, {{ result.position.lon }})</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import breadMap from "../bread-map.json";
import axios from "axios";

export default {
  data() {
    return {
      breadMap: breadMap,
      API_URL: "https://api.tomtom.com/search/2",
      API_KEY: "qD5AjlcGdPMFjUKdDAYqT7xYi3yIRo3c",
      API_TYPE: "/search/",
      API_EXT: ".json",
      breadList: null,
      breadQuery: null,
      queryResults: null,
    };
  },
  watch: {
    breadQuery() {
      this.tomtomSearch();
    },
  },
  methods: {
    tomtomSearch() {
      if (this.breadQuery) {
        axios
          .get(
            `${this.API_URL}${this.API_TYPE}${this.breadQuery}${this.API_EXT}`,
            {
              params: {
                key: this.API_KEY,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            this.queryResults = res.data.results;
          });
      }
    },
  },
  mounted() {
    // console.log(this.breadMap.slice(0, 10));
    // axios
    //   .get(this.API_URL, {
    //     params: {
    //       key: this.API_KEY,
    //       geometryList: {
    //         type: "CIRCLE",
    //         position: "40.80558, -73.96548",
    //         radius: 100,
    //       },
    //       poiList: this.breadMap.slice(1, 10),
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
};
</script>

<style lang="scss" scoped>
.container {
  .search-wrapper {
    padding: 30px;
    .query-input {
      width: 100%;
      padding: 10px 20px;
      margin-bottom: 20px;
      border: 1px solid rgba(179, 179, 179, 0.5);
      border-radius: 20px;
    }
    .query-result {
      padding: 5px 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
