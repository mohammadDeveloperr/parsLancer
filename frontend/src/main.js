/* eslint-disable */


import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routers from './router/routes'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';


// Import Bootstrap an Bootstrap-Vue CSS files
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter)

const router = new VueRouter({
  routes:routers,
  mode:"history" // برای اینکه توی لینک # نزاره
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
