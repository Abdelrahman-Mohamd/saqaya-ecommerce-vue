// Import the defineStore function from Pinia to create a store
import { defineStore } from "pinia";

// Define the Product interface to strongly type product objects in the cart,
//  we chose to use an interface over a type alias for better extensibility
export interface Product {
  id: number; // Unique identifier for the product
  title: string; // Product name/title
  price: number; // Product price
  description: string; // Product description
  category: string; // Product category (e.g., men's clothing)
  image: string; // URL to the product image
  rating: {
    rate: number; // Average rating value
    count: number; // Number of ratings
  };
}

// Create a Pinia store for managing the shopping cart
export const useCartStore = defineStore("cart", {
  // The state function returns the initial state of the store
  state: (): { items: Product[] } => ({
    // your reactive state
    items: [], // The cart starts empty (array of Product objects)
  }),
  // Actions are methods that can mutate the state (functions to update state)
  actions: {
    // Add a product to the cart
    addToCart(product: Product) {
      this.items.push(product);
    },
    // Remove a product from the cart by its id
    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
  },
  getters: {
    // computed properties based on state
  },
});
