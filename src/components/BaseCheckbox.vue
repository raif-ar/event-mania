<template>
  <div>
    <input
      type="checkbox"
      :checked="modelValue"
      class="field"
      @change="onCheckChanged"
    />
    <label v-if="label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "check-change"],
  methods: {
    onCheckChanged($event) {
      // Updates the v-model attached in the parent component
      this.$emit("update:modelValue", $event.target.checked);
      // Indication to trigger the filter API
      this.$emit("check-change");
    },
  },
};
</script>

<style scoped>
label {
  margin-left: 10px;
}
</style>
