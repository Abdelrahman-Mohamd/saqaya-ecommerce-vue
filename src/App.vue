<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script lang="ts">
import { RouterView } from "vue-router";
import DefaultLayout from "./layouts/DefaultLayout.vue";

export default {
  name: "App",
  components: {
    RouterView,
    DefaultLayout,
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
