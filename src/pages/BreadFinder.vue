<template>
  <section>
    <div class="container">
      <div class="poi-wrapper">
        <div
          class="filtered-pois"
          v-for="(result, index) in filteredPois"
          :key="index"
        >
          <p class="name">{{ result.name + " " + index }}</p>
          <p class="position">{{ result.position.lat }}</p>
          <p class="position">{{ result.position.lon }}</p>
        </div>
      </div>
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
      filteredPois: null,
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
      const searchRadius = 10000 * 1000;

      console.log(`Filter:
      Filter URL: ${filterURL}
      Search Position: ${lat} ${lon}
      Search Radius: ${searchRadius} meters
      `);

      const geometryList = [
        {
          type: "CIRCLE",
          position: lat + ", " + lon,
          radius: searchRadius,
        },
      ];

      const poiList = [
        {
          name: "location-1",
          position: {
            lat: "37.61274",
            lon: "15.166195",
          },
        },
        {
          name: "location-2",
          position: {
            lat: "37.61274",
            lon: "15.168195",
          },
        },
        {
          name: "location-3",
          position: {
            lat: "38.61274",
            lon: "12.166195",
          },
        },
      ];

      console.log(JSON.stringify(geometryList));
      console.log(JSON.stringify(poiList));

      axios
        .get(`${filterURL}`, {
          params: {
            geometryList: JSON.stringify(geometryList),
            // poiList: JSON.stringify(poiList),
            // poiList: JSON.stringify(this.breadList),
            poiList: JSON.stringify(this.breadMap.splice(0, 51)),
            key: this.API_KEY,
          },
        })
        .then((res) => {
          this.filteredPois = res.data.results;
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
            this.queryResults = res.data.results;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  overflow: auto;
}
.container {
  .poi-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .filtered-pois {
    flex-basis: calc((100% / 6) - 10px);
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 20px 0px;
    overflow: hidden;
    text-align: center;
    .name {
      font-weight: 800;
      font-size: 12px;
    }
    .position {
      font-size: 10px;
    }
  }
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
