<template>
  <div v-if="this.event">
    <h2>Event Details</h2>

    <div class="event-container">
      <div class="info-card">
        <h3 class="event-header">{{ this.event.name }}</h3>
        <p class="info-tags">
          <strong>Venue:</strong> {{ this.event._embedded.venues[0].name }}
        </p>
        <p class="info-tags">
          <strong>Information:</strong> {{ this.event.info ?? "Not Specified" }}
        </p>
        <p class="info-tags"><strong>Date:</strong> {{ eventDate }}</p>
        <p class="info-tags"><strong>Time:</strong> {{ eventTime }}</p>
        <p class="info-tags">
          <strong>Segment:</strong>
          {{ event.classifications[0].segment.name ?? "Not Specified" }}
        </p>
        <p class="info-tags">
          <strong>Genre:</strong>
          {{ event.classifications[0].genre.name ?? "Not Specified" }}
        </p>
        <p class="info-tags"><strong>Price:</strong> {{ eventPrice }}</p>
      </div>

      <div class="images-container">
        <div v-for="image in imagesToDisplay" :key="image" class="image-card">
          <img :src="image.url" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h3 class="no-event">No Event Found</h3>
  </div>
  <router-link :to="{ name: 'Home' }">Back to Home</router-link>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    eventDate() {
      if (this.event.dates.start.dateTBA) {
        return "TBA";
      } else if (this.event.dates.start.dateTBD) {
        return "TBD";
      }
      return this.event.dates.start.localDate;
    },
    eventTime() {
      if (this.event.dates.start.dateTBA || this.event.dates.start.timeTBA) {
        return "TBA";
      }
      return this.event.dates.start.localTime + " (Local Time)";
    },
    eventPrice() {
      if (this.event.priceRanges) {
        return (
          "$" +
          this.event.priceRanges[0].min +
          " - $" +
          this.event.priceRanges[0].max
        );
      }
      return "Not Specified";
    },
    imagesToDisplay() {
      // Displays only upto 2 images
      return this.event.images?.length > 2
        ? this.event.images.slice(0, 2)
        : this.event.images;
    },
    ...mapState({
      event: (state) => state.event,
    }),
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
  font-size: 40px;
  margin-left: 40px;
}

.event-container {
  display: flex;
  flex-direction: row;
  margin: 40px;
}

.info-card {
  display: flex;
  flex: 2;
  flex-direction: column;
  border: 1px solid #03dac5;
}

.event-header {
  background-color: #03dac5;
  margin: 0px;
  padding: 20px;
}

.info-tags {
  text-align: left;
  margin-left: 20px;
}

.images-container {
  display: flex;
  flex: 1;
  margin-left: 20px;
  flex-direction: column;
}

.image-card {
  flex: 1;
}

.image-card:first-of-type {
  margin-bottom: 10px;
}

.image-card > img {
  height: 100%;
  width: 100%;
}

.no-event {
  margin-top: 200px;
  margin-bottom: 200px;
  font-size: 40px;
}
</style>
>
