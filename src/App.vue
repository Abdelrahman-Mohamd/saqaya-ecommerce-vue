<template>
  <!--
    The root template of the Vue app. 
    DefaultLayout wraps the entire app, providing a consistent header, footer, and layout structure.
    RouterView renders the current route's component inside the layout.
  -->
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script lang="ts">
// Import RouterView, which is a built-in Vue component that displays the matched component for the current route.
import { RouterView } from "vue-router";
// Import the DefaultLayout component, which contains the header, footer, and a slot for page content.
import DefaultLayout from "./layouts/DefaultLayout.vue";

export default {
  // The name of this root component.
  name: "App",
  // Register components used in this file.
  components: {
    RouterView, // Used to render the current route's component
    DefaultLayout, // Used to wrap the app with header/footer
  },
};
</script>

<style>
/*
  Global CSS styles for the app. These styles apply to the entire application.
  Includes a CSS reset and some base styles for consistency across browsers.
*/
* {
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
  box-sizing: border-box; /* Use border-box for all elements */
}

html,
body {
  height: 100%; /* Full height for html and body */
  width: 100%; /* Full width for html and body */
  font-family: system-ui, sans-serif; /* Use a modern, readable font */
  background: #fff; /* Set background color to white */
  color: #222; /* Set default text color */
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Prevent horizontal scroll */
}

#app {
  min-height: 100vh; /* Ensure the app takes at least the full viewport height */
  width: 100%;
  display: flex;
  flex-direction: column; /* Stack children vertically */
}

/* Remove list styles on ul, ol elements for a clean slate */
ul,
ol {
  list-style: none;
}

a {
  color: inherit; /* Inherit color from parent */
  text-decoration: none; /* Remove underline from links */
}

img,
picture,
video,
canvas,
svg {
  display: block; /* Make media elements block-level */
  max-width: 100%; /* Prevent images/videos from overflowing their container */
}

button,
input,
textarea,
select {
  font: inherit; /* Inherit font styles for form elements */
}
</style>
