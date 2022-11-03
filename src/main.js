import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";

import routes from "./todo.routing.js";
import store from "./store/index.js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "./assets/main.css";


const router = new VueRouter({
  mode: "history",
  routes: routes(),
})

Vue.use(BootstrapVue);
Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
