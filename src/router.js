import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import ShoePage from "./components/ShoePage.vue";
import Config from "./components/Config.vue";
import Orders from "./components/Orders.vue";
import ChangePassword from "./components/ChangePassword.vue";
import ShoeDetails from "./components/ShoeDetails.vue";
import ThankYou from "./components/ThankYouPage.vue";
import Config2 from "./components/Config2.vue";

const routes = [
  { path: "/", component: ShoePage },
  { path: "/customize", component: Config },
  { path: "/login", component: Login },
  { path: "/orders", component: Orders },
  { path: "/changepassword", component: ChangePassword },
  {
    path: "/shoe/:id",
    component: ShoeDetails,
  },
  {
    path: "/thankyou",
    component: ThankYou,
  },
  {
    path: "/config2",
    component: Config2,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
