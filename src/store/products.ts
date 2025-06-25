// This file has been migrated to Vuex
// The products functionality is now handled in src/store/index.ts
// This file is kept for reference but is no longer used

// The Pinia products store has been completely replaced with Vuex store
// All product operations (fetch, getById) are now handled through Vuex actions and getters
// Components now use mapState, mapGetters, and mapActions from Vuex instead of Pinia's useProductsStore

// Original Pinia implementation (now deprecated):
/*
import { defineStore } from "pinia";
import type { Product } from "../types";

export const useProductsStore = defineStore("products", {
  state: (): { products: Product[] } => ({
    products: [],
  }),
  getters: {
    getById: (state) => (id: number) =>
      state.products.find((p) => p.id === id) || null,
  },
  actions: {
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
*/

export {}; // Export empty object to make this a valid module
