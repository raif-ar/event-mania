import axios from "axios";
import moment from "moment";

const apiClient = axios.create({
  baseURL: "https://app.ticketmaster.com/discovery/v2",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  params: {
    apikey: "GRaRKzOAhaxnjRZ1kX2WmVOJvYLmRjhB",
  },
});

export default {
  getEvents(eventForm) {
    return apiClient.get("/events", {
      params: {
        countryCode: eventForm.country,
        keyword: eventForm.searchTerm,
        startDateTime: this.formatDate(eventForm.startDate),
        endDateTime: this.formatDate(eventForm.endDate),
      },
    });
  },
  getFilteredEvents(eventForm, eventFilter) {
    return apiClient.get("/events", {
      params: {
        countryCode: eventForm.country,
        keyword: eventForm.searchTerm,
        startDateTime: this.formatDate(eventForm.startDate),
        endDateTime: this.formatDate(eventForm.endDate),
        includeTBA: eventFilter.includeTBA,
        includeTBD: eventFilter.includeTBD,
        size: eventFilter.pageSize,
        page: eventFilter.pageNumber,
        sort: eventFilter.sort,
      },
    });
  },
  getEventDetails(id) {
    console.log("Individual API is hit");
    return apiClient.get("/events/" + id);
  },
  /**
   * Converts date from YYYY-MM-DDTHH:mm:ss.SSSZ format to YYYY-MM-DDTHH:mm:ssZ format for sending as parameter to the API
   * @param date Date object
   * @returns Formatted date string
   */
  formatDate(date) {
    if (date) {
      return moment(date).format("YYYY-MM-DDTHH:mm:ss") + "Z";
    }
  },
};
