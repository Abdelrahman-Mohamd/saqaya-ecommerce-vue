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
  // This function returns an object that matches the CartState interface
  state: (): CartState => ({
    items: [], // Initialize with empty cart (array of CartItem objects)
  }),

  // Module mutations - cart-specific state changes (ONLY state modifications)
  mutations: {
    // Add a cart item
    addToCart(state: CartState, cartItem: CartItem) {
      state.items.push(cartItem);
    },

    //  Update quantity of existing item
    updateCartItemQuantity(
      state: CartState,
      { index, quantity }: { index: number; quantity: number }
    ) {
      state.items[index].quantity = quantity;
    },

    // Remove item from cart by index
    removeCartItem(state: CartState, index: number) {
      state.items.splice(index, 1);
    },

    // Clear entire cart
    clearCart(state: CartState) {
      state.items = [];
    },
  },
  // Module actions - cart-specific business logic
  actions: {
    // Add product to cart
    addToCart({ commit, state }: any, product: Product) {
      // Find if product already exists in cart
      const existingItemIndex = state.items.findIndex(
        (item: CartItem) => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Product already in cart - increment quantity by 1
        const newQuantity = state.items[existingItemIndex].quantity + 1;
        commit("updateCartItemQuantity", {
          index: existingItemIndex,
          quantity: newQuantity,
        });
      } else {
        // New product - add to cart with quantity of 1
        const newCartItem: CartItem = {
          product, // The complete product object
          quantity: 1, // Initial quantity
        };
        commit("addToCart", newCartItem);
      }
    },

    // Remove one item from cart
    removeFromCart({ commit, state }: any, productId: number) {
      // Find the item to remove
      const existingItemIndex = state.items.findIndex(
        (item: CartItem) => item.product.id === productId
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.quantity > 1) {
          // Business logic: More than 1 quantity - just decrement by 1
          const newQuantity = existingItem.quantity - 1;
          commit("updateCartItemQuantity", {
            index: existingItemIndex,
            quantity: newQuantity,
          });
        } else {
          // Only 1 quantity left - remove item completely
          commit("removeCartItem", existingItemIndex);
        }
      }
    },

    // Remove specific item from cart completely
    clearCart({ commit, state }: any, productId: number) {
      // Find the item to remove completely
      const existingItemIndex = state.items.findIndex(
        (item: CartItem) => item.product.id === productId
      );

      if (existingItemIndex !== -1) {
        // Item found - remove it completely regardless of quantity
        commit("removeCartItem", existingItemIndex);
      }
    },

    // Action: Clear entire cart
    clearAllCart({ commit }: any) {
      // Business logic: Clear the entire cart
      commit("clearCart");
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
  },
};

export default cartModule;
