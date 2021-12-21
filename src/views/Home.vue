<template>
  <div v-if="isLoading" class="fade-wrapper"></div>
  <!-- #region Event Form -->
  <form @submit.prevent="onSearchEvents">
    <div class="form-input-container">
      <div class="form-input country-select">
        <label for="countrySelect">Country:</label>
        <v-select
          id="countrySelect"
          label="name"
          :options="$store.state.countries"
          :reduce="(country) => country.code"
          v-model="eventForm.country"
        ></v-select>
      </div>

      <div class="form-input">
        <label for="searchInput">Keyword:</label>
        <input
          id="searchInput"
          class="search-input"
          type="text"
          v-model="eventForm.searchTerm"
        />
      </div>
      <div class="form-input datepicker">
        <label for="startDate">Start Date:</label>
        <DatePicker id="startDate" v-model="eventForm.startDate">
          <template v-slot="{ inputValue, inputEvents }">
            <input :value="inputValue" v-on="inputEvents" />
          </template>
        </DatePicker>
      </div>
      <div class="form-input datepicker">
        <label for="endDate">End Date:</label>
        <DatePicker id="endDate" v-model="eventForm.endDate">
          <template v-slot="{ inputValue, inputEvents }">
            <input :value="inputValue" v-on="inputEvents" />
          </template>
        </DatePicker>
      </div>

      <div class="button-container">
        <button type="submit">Search</button>
      </div>
    </div>
  </form>
  <!-- #endregion -->

  <hr />

  <!-- #region Event Filters -->
  <div class="filter-container">
    <div class="filter-component filter-checkboxes" v-if="!isNoDataSearch">
      <BaseCheckbox
        v-model="eventFilters.includeTBA"
        label="Include TBA?"
        @check-change="onFilterEvents"
      />
      <BaseCheckbox
        v-model="eventFilters.includeTBD"
        label="Include TBD?"
        @check-change="onFilterEvents"
      />
    </div>

    <div class="filter-component" v-if="!isNoDataSearch">
      <SortSelection
        v-model="eventFilters.sort.parameter"
        :options="sortOptions"
        :sortOrder="eventFilters.sort.order"
        @sort-by-change="onFilterEvents"
        @sort-order-change="onSortOrderChange"
      />
    </div>

    <div class="filter-component" v-if="!isNoDataSearch">
      <label
        >Records per page:
        <select v-model="eventFilters.pageSize" @change="onFilterEvents">
          <option
            v-for="size in sizeOptions"
            :key="size"
            :value="size"
            :selected="size === eventFilters.pageSize"
          >
            {{ size }}
          </option>
        </select>
      </label>
    </div>
  </div>

  <Pagination
    v-if="!isNoDataSearch && !isNoDataFilter && totalPagesForPagination > 0"
    :total-pages="totalPagesForPagination"
    :per-page="eventFilters.pageSize"
    :current-page="currentPage"
    @pagechanged="onPageChange"
  />
  <!-- #endregion -->

  <div class="event-card-container">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>

  <div class="info-search-container" v-if="isNoDataSearch">
    <h3>Click on "Search" to get events</h3>
  </div>

  <div class="info-filter-container" v-if="isNoDataFilter">
    <h3>No Data found. Please modify the filter and try again</h3>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { DatePicker } from "v-calendar";
import NProgress from "nprogress";

import "vue-select/dist/vue-select.css";

import EventCard from "@/components/EventCard.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import EventService from "@/services/EventService.js";
import SortSelection from "@/components/SortSelection.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Home",
  components: {
    vSelect,
    DatePicker,
    EventCard,
    BaseCheckbox,
    SortSelection,
    Pagination,
  },
  data() {
    return {
      date: new Date(),
      events: [],
      eventForm: {
        country: null,
        searchTerm: null,
        startDate: null,
        endDate: null,
      },
      // The search form inputs upon which filtering is to be done
      eventSearchForFiltering: null,
      eventFilters: {
        includeTBA: false,
        includeTBD: false,
        pageSize: 20,
        pageNumber: 0,
        sort: {
          parameter: "relevance",
          order: "desc",
        },
      },
      sortOptions: ["name", "date", "relevance"],
      sizeOptions: [10, 20, 50, 100, 200],
      totalPages: 0,
      totalRecords: 0,
      currentPage: 1,
      isLoading: false,
      isNoDataSearch: true,
      isNoDataFilter: false,
    };
  },
  computed: {
    eventFiltersForAPI() {
      return {
        ...this.eventFilters,
        includeTBA: this.eventFilters.includeTBA ? "yes" : "no",
        includeTBD: this.eventFilters.includeTBD ? "yes" : "no",
        sort:
          this.eventFilters.sort.parameter + "," + this.eventFilters.sort.order,
      };
    },
    totalPagesForPagination() {
      // To control the error - "API Limits Exceeded: Max paging depth exceeded. (page * size) must be less than 1,000"
      if (this.totalRecords > 1000) {
        return Math.floor(1000 / this.eventFilters.pageSize);
      } else {
        return Math.floor(this.totalRecords / this.eventFilters.pageSize);
      }
    },
  },
  methods: {
    onSearchEvents() {
      NProgress.start();
      this.isLoading = true;

      EventService.getEvents(this.eventForm)
        .then((response) => {
          if (response.data.page.totalElements > 0) {
            this.eventSearchForFiltering = this.eventForm;
            this.events = response.data._embedded.events;
            this.totalPages = response.data.page.totalPages;
            this.totalRecords = response.data.page.totalElements;
            this.isNoDataSearch = false;
          } else {
            this.eventSearchForFiltering = null;
            this.events = [];
            this.totalPages = 0;
            this.totalRecords = 0;
            this.isNoDataSearch = true;
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          NProgress.done();
          this.isLoading = false;
        });
    },
    onFilterEvents() {
      if (this.eventSearchForFiltering) {
        NProgress.start();
        this.isLoading = true;

        EventService.getFilteredEvents(
          this.eventSearchForFiltering,
          this.eventFiltersForAPI
        )
          .then((response) => {
            if (response.data.page.totalElements > 0) {
              this.events = response.data._embedded.events;
              this.totalPages = response.data.page.totalPages;
              this.totalRecords = response.data.page.totalElements;
              this.isNoDataFilter = false;
            } else {
              this.events = [];
              this.totalPages = 0;
              this.totalRecords = 0;
              this.isNoDataFilter = true;
            }
          })
          .catch((error) => console.log(error))
          .finally(() => {
            NProgress.done();
            this.isLoading = false;
          });
      }
    },
    onSortOrderChange(sortOrder) {
      this.eventFilters.sort.order = sortOrder;
      this.onFilterEvents();
    },
    onPageChange(page) {
      this.currentPage = page;
      this.eventFilters.pageNumber = page - 1;
      this.onFilterEvents();
    },
  },
};
</script>

<style scoped>
.form-input-container {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
}

.form-input {
  display: flex;
  flex: 3;
  flex-direction: row;
  align-items: center;
  margin: 1rem;
}

.form-input > label {
  font-weight: bold;
  margin-right: 8px;
}

.search-input {
  height: 27px;
  padding-left: 10px;
  font-size: 14px;
}

.form-input.country-select {
  flex: 4;
}

.form-input.country-select > div {
  width: 100%;
}

.form-input.datepicker > div > input {
  height: 27px;
  letter-spacing: 2px;
  text-align: center;
}

.button-container {
  display: flex;
  flex: 3;
  align-items: center;
}

.button-container > button {
  height: 40px;
  width: 12rem;
  background-color: #bb86fc;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
}

hr {
  margin-left: 20px;
  margin-right: 20px;
}

.info-search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  font-size: 20px;
  margin-top: 200px;
}

.info-filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  font-size: 20px;
  margin-top: 140px;
}

.filter-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.filter-component.filter-checkboxes {
  display: flex;
  flex-direction: column;
}

.event-card-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.fade-wrapper {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
}
</style>
