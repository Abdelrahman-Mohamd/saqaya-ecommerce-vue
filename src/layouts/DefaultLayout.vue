<template>
  <!--
    DefaultLayout is a layout component that wraps all pages.
    It provides a consistent header and footer for every page.
    The <slot /> element renders the content of the current page inside the layout.
  -->
  <div>
    <Header />
    <!-- The site header/navigation bar -->
    <main>
      <slot />
      <!-- Page content will be injected here -->
    </main>
    <Footer />
    <!-- The site footer -->
  </div>
</template>

<script lang="ts">
// Import the Header and Footer components to be used in the layout
import Header from "../components/AppHeader.vue";
import Footer from "../components/AppFooter.vue";

export default {
  // Name of the layout component
  name: "DefaultLayout",

  // Register Header and Footer as child components because in options API,
  // Vue doesn't automatically recognize components imported in the script section,
  // Vue still needs you to say: Hey Vue, I want to use this imported Header component in this component’s template.
  components: { Header, Footer },
};
</script>

<style scoped>
/*
  Style for the main content area.
  Ensures the main section takes up at least 60% of the viewport height,
  so the footer stays at the bottom even on short pages.
*/
main {
  min-height: 60vh;
}
</style>
