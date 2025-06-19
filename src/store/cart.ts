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

// Define the CartItem interface to represent an item in the cart
// This is a composition approach, it keeps the Product separate from the cart logic.
// That violates the Single Responsibility Principle (SRP)
//extends Product flattens the object and says: “CartItem is literally just a Product + 1 field.”
// { product: Product } wraps the Product and says: “CartItem is a separate thing that has a product inside it.”
export interface CartItem {
  product: Product; // The product object
  quantity: number; // How many of this product are in the cart
}

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
