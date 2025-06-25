// Vuex Cart Module
// This module handles all cart-related state, mutations, actions, and getters
import type { Product, CartItem } from "../../types";
import type { CartState } from "../../types";

// Cart Module Definition
const cartModule = {
  // Use namespaced modules for better organization and isolation
  // This allows us to avoid naming conflicts with other modules
  // This means actions/mutations/getters will be prefixed with 'cart/'
  namespaced: true,

  // Module state - cart-specific data
  // This function returns an object that matches the CartState interface.
  state: (): CartState => ({
    items: [], // Initialize with empty cart (array of CartItem objects)
  }),

  // Module mutations - cart-specific state changes
  mutations: {
    // In Vuex mutations, the first parameter is always the module state
    // The second parameter is the payload (what you want to add to the cart)
    addToCart(state: CartState, product: Product) {
      // Find if product already exists in cart by comparing product IDs
      const existingItem = state.items.find(
        (item: CartItem) => item.product.id === product.id
      );

      if (existingItem) {
        // Product already in cart - increment quantity by 1
        existingItem.quantity += 1;
      } else {
        // New product - add to cart with quantity of 1
        state.items.push({
          product, // The complete product object
          quantity: 1, // Initial quantity
        });
      }
    },

    removeFromCart(state: CartState, productId: number) {
      // Find the index of the item to remove
      const index = state.items.findIndex(
        (item: CartItem) => item.product.id === productId
      );

      // Only proceed if item exists in cart
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          // More than 1 quantity - just decrement by 1
          state.items[index].quantity -= 1;
        } else {
          // Only 1 quantity left - remove item completely from cart
          // splice() modifies the original array by removing elements
          state.items.splice(index, 1);
        }
      }
    },

    // Clear the entire cart item no matter the quantity
    clearCart(state: CartState, productId: number) {
      const index = state.items.findIndex(
        (item: CartItem) => item.product.id === productId
      );

      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
  // Module actions - cart-specific async operations
  actions: {
    // the first parameter of an action is the context object, which contains several properties and methods for interacting with the store (like commit, dispatch, state, getters, etc.)
    // object destructuring: it extracts the commit method from the context object.
    // Type: any is a shortcut to avoid TypeScript errors when you don't want to define the full type of the context object.
    // The proper type is (ActionContext<CartState, RootState>), so any is often used for simplicity in small projects or examples.
    addToCart({ commit }: any, product: Product) {
      // Commit the addToCart mutation within this module
      commit("addToCart", product);
    },

    removeFromCart({ commit }: any, productId: number) {
      // Commit the removeFromCart mutation within this module
      commit("removeFromCart", productId);
    },
    clearCart({ commit }: any, productId: number) {
      // Commit the clearCart mutation within this module
      commit("clearCart", productId);
    },
  },

  // Module getters - cart-specific computed properties
  getters: {
    // Get all cart items
    items: (state: CartState): CartItem[] => {
      return state.items;
    },

    // Get total number of items in cart (sum of all quantities)
    itemCount: (state: CartState): number => {
      return state.items.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
    },

    //Get total price of all items in cart
    total: (state: CartState): number => {
      return state.items.reduce(
        (total: number, item: CartItem) =>
          total + item.product.price * item.quantity,
        0
      );
    },

    //  Check if cart is empty
    isEmpty: (state: CartState): boolean => {
      return state.items.length === 0;
    },
  },
};

export default cartModule;
