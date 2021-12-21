<template>
  <label> Sort By: </label>
  <select :value="modelValue" @change="onSelectionChanged">
    <option
      v-for="option in options"
      :value="option"
      :key="option"
      :selected="option === modelValue"
    >
      {{ option }}
    </option>
  </select>
  <!-- Toggle sort order  -->
  <FontAwesomeIcon
    class="icon"
    v-if="sortOrder === 'asc'"
    :icon="ascIcon"
    @click="$emit('sort-order-change', 'desc')"
  />
  <FontAwesomeIcon
    class="icon"
    v-else
    :icon="descIcon"
    @click="$emit('sort-order-change', 'asc')"
  />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSortAlphaUp,
  faSortAlphaDownAlt,
} from "@fortawesome/free-solid-svg-icons";

export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      ascIcon: faSortAlphaUp,
      descIcon: faSortAlphaDownAlt,
    };
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    sortOrder: {
      type: String,
    },
  },
  emits: ["update:modelValue", "sort-by-change", "sort-order-change"],
  methods: {
    onSelectionChanged($event) {
      // Updates the v-model attached in the parent component
      this.$emit("update:modelValue", $event.target.value);
      // Indication to trigger the filter API
      this.$emit("sort-by-change");
    },
  },
};
</script>

<style scoped>
select {
  text-transform: capitalize;
}

.icon {
  margin-left: 20px;
  cursor: pointer;
}
</style>
