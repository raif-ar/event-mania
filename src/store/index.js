import { createStore } from "vuex";
import { countries } from "../assets/countries";

export default createStore({
  state: {
    countries,
    events: [],
    event: {},
  },
  mutations: {},
  actions: {},
  modules: {},
});
