import { createStore } from "vuex";
import { countries } from "../assets/countries";
import EventService from "../services/EventService";

export default createStore({
  state: {
    countries,
    event: {},
  },
  mutations: {
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    fetchEvent({ commit }, id) {
      return EventService.getEventDetails(id)
        .then((response) => {
          commit("SET_EVENT", response.data);
        })
        .catch((error) => {
          commit("SET_EVENT", {});
          throw error;
        });
    },
  },
  modules: {},
});
