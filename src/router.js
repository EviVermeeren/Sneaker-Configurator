// router.js
import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import ShoePage from "./components/ShoePage.vue";
import Config from "./components/Config.vue";
import Orders from "./components/Orders.vue";
import ChangePassword from "./components/ChangePassword.vue";

const routes = [
  { path: "/", component: ShoePage },
  { path: "/customize", component: Config },
  { path: "/login", component: Login },
  { path: "/orders", component: Orders },
  { path: "/changepassword", component: ChangePassword },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
