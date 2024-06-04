/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routers from './router/routes'

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
