<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>

  </div>
</template>

<script>
import navbar from "./components/navbar.vue"

export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<style>

</style>
