<template>
  <div id="app">
    <navbar ></navbar>
    <router-view @login="login($event)"></router-view>
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
  },
  methods:{
  }
}
</script>

<style></style>
