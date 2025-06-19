// Import the function to create a new Vue application instance
import { createApp } from "vue";
// Import the function to create a new Pinia store instance (state management)
import { createPinia } from "pinia";
// Import the root App component
import App from "./App.vue";
// Import the router instance for handling page navigation
import router from "./router";

// Create a new Vue application using the root App component
const app = createApp(App);

// Register Pinia as a plugin so all components can use the global store
app.use(createPinia()); // Register Pinia (state management)
// Register the router so the app can handle navigation and routes
app.use(router);

// Mount (attach) the Vue app to the DOM element with id="app" (in index.html) so it appears on the page.
app.mount("#app");
