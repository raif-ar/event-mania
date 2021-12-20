<template>
  <label
    >Country
    <v-select
      label="name"
      :options="$store.state.countries"
      :reduce="(country) => country.code"
    ></v-select>
  </label>

  <label
    >Search Term
    <input type="text" />
  </label>
  <label
    >Start Date
    <BaseDatePicker />
  </label>
  <label
    >End Date
    <BaseDatePicker />
  </label>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import BaseDatePicker from "@/components/BaseDatePicker.vue";

export default {
  name: "Home",
  components: {
    vSelect,
    BaseDatePicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>
