// Import Vuex store creation functions and types
// @ts-ignore - Vuex 4 module resolution issue with Vite, but works at runtime
import { createStore } from "vuex";
// Import our custom Vuex modules
import cartModule from "./modules/cart";
import productsModule from "./modules/products";

// Create and export the Vuex store with modules
export default createStore({
  // Root state (if you need any global state not belonging to modules)
  state: () => ({
    // Add any global state here if needed
    // For now, all state is handled by modules
  }),

  // Root mutations (for global state changes not belonging to modules)
  mutations: {
    // Add any global mutations here if needed
    // Most mutations are handled by modules
  },

  // Root actions (for global actions or cross-module operations)
  actions: {
    // Add any global actions here if needed
    // Most actions are handled by modules

    /**
     * Initialize the entire application
     * This action can be used to set up initial state across modules
     */
    async initializeApp({ dispatch }) {
      try {
        // Fetch products when app initializes
        await dispatch("products/fetchProducts");
        // You could also initialize cart from localStorage here
        // await dispatch('cart/setCartItems', savedCartItems);
      } catch (error) {
        console.error("Failed to initialize app:", error);
      }
    },
  },
  // Root getters (for computed properties that span multiple modules)
  getters: {
    // Add any global getters here if needed
    // Most getters are handled by modules

    /**
     * Get app initialization status
     * This could be useful for showing loading states
     */
    isInitialized: (_state: any, getters: any) => {
      // Example: App is initialized when we have products loaded
      return getters["products/count"] > 0;
    },
  },

  // Register modules
  modules: {
    // Cart module - handles all cart-related functionality
    // Will be available as store.state.cart, store.dispatch('cart/action'), etc.
    cart: cartModule,

    // Products module - handles all products-related functionality
    // Will be available as store.state.products, store.dispatch('products/action'), etc.
    products: productsModule,
  },

  // Enable strict mode in development for better debugging
  // This ensures state is only mutated through mutations
  strict: import.meta.env.DEV,
});
