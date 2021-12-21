<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventDetails', params: { id: event.id } }"
  >
    <div class="event-card">
      <span v-if="event.dates.start.dateTBA">TBA</span>
      <span v-else-if="event.dates.start.dateTBD">TBD</span>
      <span v-else
        >@ {{ event.dates.start.localTime }} on
        {{ event.dates.start.localDate }}</span
      >
      <h4>{{ event.name }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  props: { event: Object },
};
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  height: 120px;
  cursor: pointer;
  border: 1px solid #03dac5;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #03dac5;
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
  margin-bottom: 18px;
  margin-right: 18px;
}
</style>
