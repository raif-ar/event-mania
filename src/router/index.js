import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import Home from "../views/Home.vue";
import EventDetails from "../views/EventDetails.vue";
import NetworkError from "../views/NetworkError.vue";
import NotFound from "../views/NotFound.vue";
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
      // Redirects to Network Error page on error because API is returning CORS error always before 404
      return store
        .dispatch("fetchEvent", to.params.id)
        .catch(() => ({ name: "NetworkError" }));
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
