import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import Home from "../views/Home.vue";
import EventDetails from "../views/EventDetails.vue";
import NetworkError from "../views/NetworkError.vue";
import NotFound from "../views/NotFound.vue";
import EventService from "@/services/EventService.js";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    component: EventDetails,
    beforeEnter: (to) => {
      return EventService.getEventDetails(to.params.id)
        .then((response) => {
          store.state.event = response.data;
        })
        .catch(() => {
          return { name: "NetworkError" };
        });
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
