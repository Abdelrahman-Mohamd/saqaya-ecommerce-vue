// Import defineStore from Pinia to create a store
import { defineStore } from "pinia";
// Import the Product type for strong typing
import type { Product } from "./cart";

// Create a Pinia store for products
export const useProductsStore = defineStore("products", {
  // State contains the array of products
  state: (): { products: Product[] } => ({
    products: [], // Start with an empty array, will be filled from API
  }),
  // Getters are like computed properties for the store
  getters: {
    // getById returns a product by its id, or null if not found
    getById: (state) => (id: number) =>
      state.products.find((p) => p.id === id) || null,
  },
  // Actions for async logic
  actions: {
    // Fetch products from the Fake Store API
    async fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        this.products = await res.json();
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    },
  },
});
