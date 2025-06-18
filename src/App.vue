<template>
  <div class="app">
    <Header />
    <main class="app__main">
      <!-- This renders the current route component -->
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    RouterView,
    Header,
    Footer,
  },
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app__main {
  flex: 1 0 auto;
  width: 100%;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
