// Import the function to create a new Vue application instance
import { createApp } from "vue";
// Import the Vuex store instance (state management)
import store from "./store";
// Import the root App component
import App from "./App.vue";
// Import the router instance for handling page navigation
import router from "./router";

// Create a new Vue application using the root App component
const app = createApp(App);

// Register Vuex store as a plugin so all components can use global state
app.use(store); // Register Vuex store (state management)
// Register the router so the app can handle navigation and routes
app.use(router);

// Mount (attach) the Vue app to the DOM element with id="app" (in index.html) so it appears on the page.
app.mount("#app");
