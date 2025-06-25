// This file has been migrated to Vuex
// The cart functionality is now handled in src/store/index.ts
// This file is kept for reference but is no longer used

// The Pinia cart store has been completely replaced with a Vuex store
// All cart operations (add, remove, clear) are now handled through Vuex actions and mutations
// Components now use mapState, mapGetters, and mapActions from Vuex instead of Pinia's useCartStore

// Original Pinia implementation (now deprecated):
/*
import { defineStore } from "pinia";
import type { Product, CartItem } from "../types";

export const useCartStore = defineStore("cart", {
  state: (): { items: CartItem[] } => ({
    items: [],
  }),
  actions: {
    addToCart(product: Product) {
      const existing = this.items.find(
        (item) => item.product.id === product.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },
    removeFromCart(productId: number) {
      const index = this.items.findIndex(
        (item) => item.product.id === productId
      );
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity -= 1;
        } else {
          this.items.splice(index, 1);
        }
      }
    },
  },
  getters: {
    // computed properties based on state
  },
});
*/

export {}; // Export empty object to make this a valid module
