<template>
  <DatePicker v-model="date">
    <template v-slot="{ inputValue, inputEvents }">
      <input :value="inputValue" v-on="inputEvents" />
    </template>
  </DatePicker>
</template>

<script>
import { DatePicker } from "v-calendar";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      date: null,
    };
  },
};
</script>
