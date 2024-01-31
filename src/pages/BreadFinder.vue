<template>
  <section>
    <div class="container">
      <div class="search-wrapper">
        <input
          class="query-input"
          type="text"
          v-model="breadQuery"
          @keydown.enter="tomtomSearch()"
        />
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
      API_EXT: ".json",
      queryType: null,
      breadList: null,
      breadQuery: null,
      queryResults: null,
    };
  },
  watch: {
    queryResults() {
      this.tomtomFilter();
    },
    // breadQuery() {
    //   this.tomtomSearch();
    //   // this.tomtomFilter();
    // },
  },
  methods: {
    tomtomFilter() {
      this.queryType = "/geometryFilter";
      const filterURL = this.API_URL + this.queryType + this.API_EXT;
      const lat = this.queryResults[0].position.lat;
      const lon = this.queryResults[0].position.lon;
      const searchRadius = 100;

      console.log(`Filter:
      Filter URL: ${filterURL}
      Search Position: ${lat} ${lon}
      Search Radius: ${searchRadius} meters
      `);

      const geometryList = [
        {
          type: "CIRCLE",
          position: lat + " " + lon,
          radius: searchRadius,
        },
      ];

      const poiList = [
        {
          lat: "37.61274",
          lon: "15.166195",
        },
        {
          lat: "37.61274",
          lon: "15.168195",
        },
        {
          lat: "38.61274",
          lon: "12.166195",
        },
      ];

      console.log(JSON.stringify(geometryList));
      console.log(JSON.stringify(poiList));

      axios.post(`${filterURL}`, {
        params: {
          // geometryList: JSON.stringify(geometryList),
          // poiList: JSON.stringify(poiList),
          key: this.API_KEY,
        },
      });
    },
    tomtomSearch() {
      this.queryType = "/search/";
      if (this.breadQuery) {
        axios
          .get(
            `${this.API_URL}${this.queryType}${this.breadQuery}${this.API_EXT}`,
            {
              params: {
                key: this.API_KEY,
              },
            }
          )
          .then((res) => {
            // console.log(res.data);
            this.queryResults = res.data.results;
          });
      }
    },
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
