<template>
  <section>
    <div class="container">
      <div class="poi-wrapper">
        <div class="filtered-pois" v-for="(result, index) in filterResults">
          <p>{{ index + 1 }}</p>
          <p class="name">{{ result.name }}</p>
          <p class="position">{{ result.position.lat }}</p>
          <p class="position">{{ result.position.lon }}</p>
        </div>
      </div>
      <div class="search-wrapper">
        <div class="search-form">
          <div>
            <label for="search-query">Address search</label>
            <input
              class="query-input"
              type="text"
              name="search-query"
              id="search-query"
              v-model="searchQuery"
              @keydown.enter="tomtomSearch()"
            />
          </div>
          <div>
            <label for="search-radius">Search radius in km</label>
            <input
              class="query-input"
              type="number"
              name="search-radius"
              id="search-radius"
              v-model="searchRadius"
              @keydown.enter="tomtomSearch()"
            />
          </div>
        </div>
        <div v-for="result in searchResults">
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
import axios from "axios";
import poiList from "../poiList.json";
import geometryList from "../geometryList.json";
import requestData from "../request-data.json";
export default {
  data() {
    return {
      API_URL: "https://api.tomtom.com/search/2",
      API_KEY: "qD5AjlcGdPMFjUKdDAYqT7xYi3yIRo3c",
      API_EXT: ".json",
      searchRadius: 20,
      searchQuery: null,
      searchResults: null,
      filterResults: {},
    };
  },
  watch: {
    searchResults() {
      this.tomtomFilter();
    },
  },
  methods: {
    tomtomSearch() {
      if (this.searchQuery) {
        axios
          .get(
            "https://api.tomtom.com/search/2/search/" +
              this.searchQuery +
              ".json?key=qD5AjlcGdPMFjUKdDAYqT7xYi3yIRo3c",
            {
              params: {
                key: this.API_KEY,
              },
            }
          )
          .then((res) => {
            this.searchResults = res.data.results;
          });
      }
    },
    async tomtomFilter() {
      const lat = this.searchResults[0].position.lat;
      const lon = this.searchResults[0].position.lon;
      const totalItems = poiList.length;
      const batchSize = 25;
      let offset = 0;

      while (offset < totalItems) {
        const data = {
          poiList: poiList.slice(offset, offset + batchSize),
          geometryList: [
            {
              position: lat + "," + lon,
              radius: this.searchRadius * 1000,
              type: "CIRCLE",
            },
          ],
        };

        const response = await axios.post(
          "https://api.tomtom.com/search/2/geometryFilter.json?key=qD5AjlcGdPMFjUKdDAYqT7xYi3yIRo3c",
          data
        );

        Object.assign(this.filterResults, response.data.results);
        offset += batchSize;

        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      console.log(this.filterResults);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
section {
  overflow: auto;
}
.container {
  .poi-wrapper,
  .search-wrapper {
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 30px;
  }
  .poi-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .filtered-pois {
    flex-basis: calc((100% / 6) - 10px);
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 20px;
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
    .search-form {
      margin-bottom: 10px;
      display: flex;
      gap: 20px;
      & > :first-child {
        flex-grow: 1;
      }
    }
    .query-input {
      border: 1px solid rgba(135, 184, 135, 0.521);
      border-radius: 8px;
      padding: 8px 12px;
      margin-block: 5px;
      display: block;
      outline: none;
      width: 100%;
    }
    .query-result {
      padding: 5px 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
