<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import navbar from "./components/navbar.vue"
import Footer from "./components/footer.vue"
export default {
  name: 'App',
  components: {
    Footer,
    navbar,
  }
}
</script>

<style></style>
