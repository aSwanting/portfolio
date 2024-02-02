<template>
  <section>
    <div class="container">
      <div class="poi">
        <div class="poi-wrapper">
          <div class="filtered-pois" v-for="(result, index) in filterResults">
            <p class="index">{{ index + 1 }}</p>
            <p class="name">{{ result.name }}</p>
            <p class="region">{{ result.region }}</p>
            <p class="city">{{ result.city }}</p>
          </div>
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
              @keydown.enter="tomtomFilter()"
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
              @keydown.enter="tomtomFilter()"
            />
          </div>
        </div>
        <div class="query-results">
          <div class="query-result" v-for="result in searchResults">
            <span @click="searchSuggested(result.address.freeformAddress)">{{
              result.address.freeformAddress
            }}</span>
            <span>
              {{ result.position.lat }},
              {{ result.position.lon }}
            </span>
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
      filterResults: [],
    };
  },
  watch: {
    searchQuery() {
      this.tomtomSearch();
    },
    // searchResults() {
    //   this.tomtomFilter();
    // },
  },
  methods: {
    searchSuggested(suggestedAddress) {
      this.searchQuery = suggestedAddress;
      this.tomtomFilter();
    },
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
      this.filterResults = [];
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

        console.log(response.data.results);

        this.filterResults.push(...response.data.results);

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
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  .poi-wrapper,
  .search-wrapper {
    padding: 30px;
  }
  .poi {
    flex-grow: 1;
    overflow: auto;
    border-block: 2px solid rgba(69, 126, 91, 0.151);
    .poi-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      flex-wrap: wrap;
      gap: 20px;
      .filtered-pois {
        flex-basis: calc((100% / 6) - 20px);
        height: 250px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        text-align: center;
        color: rgb(0, 71, 88);
        & > * {
          padding: 15px;
        }
        .index {
          background-color: rgba(255, 255, 255, 0.1);
          font-size: 18px;
          font-weight: 700;
        }
        .name {
          background-color: rgba(180, 180, 180, 0.1);
          flex-grow: 1;
          font-size: 16px;
          font-weight: 700;
        }
        .region {
          background-color: rgba(90, 90, 90, 0.1);
        }
        .city {
          background-color: rgba(0, 0, 0, 0.1);
          font-weight: 600;
        }
      }
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
    .query-results {
      border-block: 1px solid rgba(69, 126, 91, 0.151);
      height: 80px;
      overflow: auto;
      .query-result {
        font-size: 12px;
        margin: 8px 16px;
        display: flex;
        & :first-child {
          cursor: pointer;
          margin-right: auto;
          transition: 200ms all;
          &:hover {
            color: rgb(31, 185, 152);
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
