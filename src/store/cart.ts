// Import the defineStore function from Pinia to create a store
import { defineStore } from "pinia";
import type { Product, CartItem } from "../types"; // Import types for strong typing

// Create a Pinia store for managing the shopping cart
export const useCartStore = defineStore("cart", {
  // The state function returns the initial state of the store
  state: (): { items: CartItem[] } => ({
    // your reactive state
    items: [], // The cart starts empty (array of CartItem objects)
  }),
  // Actions are methods that can mutate the state (functions to update state)
  actions: {
    // Add a product to the cart (increment quantity if already present)
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
    // Remove a single quantity of a product from the cart by its id
    removeFromCart(productId: number) {
      const index = this.items.findIndex(
        (item) => item.product.id === productId
      );
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity -= 1;
        } else {
          this.items.splice(index, 1); // used to add, remove, or replace elements in an array in place (i.e., it modifies the original array).
        }
      }
    },
  },
  getters: {
    // computed properties based on state
  },
});
