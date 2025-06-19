<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Header from "../components/AppHeader.vue";
import Footer from "../components/AppFooter.vue";

export default {
  name: "DefaultLayout",
  components: { Header, Footer },
};
</script>

<style scoped>
main {
  min-height: 60vh;
}
</style>
