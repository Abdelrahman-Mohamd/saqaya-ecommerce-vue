// Vuex Products Module
// This module handles all products-related state, mutations, actions, and getters
import type { Product } from "../../types";
import type { ProductsState } from "../../types";

// Products Module Definition
const productsModule = {
  // Use namespaced modules for better organization and isolation
  // This allows us to avoid naming conflicts with other modules
  // This means actions/mutations/getters will be prefixed with 'products/'
  namespaced: true,

  // Module state - products-specific data
  state: (): ProductsState => ({
    items: [], // Initialize with empty products array
  }),

  // Module mutations - products-specific state changes
  mutations: {
    // Set the products array (from API)
    setProducts(state: ProductsState, products: Product[]) {
      state.items = products;
    },
  },

  // Module actions - products-specific async operations
  actions: {
    // Fetch products from API (async action)
    async fetchProducts({ commit }: any) {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const products = await res.json();
        commit("setProducts", products);
        return products; // Return for component usage
      } catch (err) {
        console.error("Error fetching products:", err);
        throw err; // Re-throw for component error handling
      }
    },

    // Fetch a single product by ID (async action)
    async fetchProductById({ commit, state }: any, productId: number) {
      try {
        // Check if product already exists in state
        const existingProduct = state.items.find(
          (p: Product) => p.id === productId
        );
        if (existingProduct) {
          return existingProduct;
        }

        // Fetch from API if not in state
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        if (!res.ok) throw new Error(`Failed to fetch product ${productId}`);
        const product = await res.json();
        commit("addProduct", product);
        return product;
      } catch (err) {
        console.error(`Error fetching product ${productId}:`, err);
        throw err;
      }
    },
  },

  // Module getters - products-specific computed properties
  getters: {
    // Get product by ID
    getById:
      (state: ProductsState) =>
      (productId: number): Product | null => {
        return (
          state.items.find((product: Product) => product.id === productId) ||
          null
        );
      },
  },
};

export default productsModule;
