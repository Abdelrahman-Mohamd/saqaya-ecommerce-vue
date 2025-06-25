// Alternative approach - combining mutations (NOT RECOMMENDED)
// This violates Vuex best practices but shows what you asked for

const cartModule = {
  namespaced: true,

  state: (): CartState => ({
    items: [],
  }),

  mutations: {
    // ❌ Complex mutation that does multiple things based on payload
    addToCart(
      state: CartState,
      payload: { product: Product; existingIndex?: number; quantity?: number }
    ) {
      if (payload.existingIndex !== undefined) {
        // Update existing item quantity
        const newQuantity =
          payload.quantity || state.items[payload.existingIndex].quantity + 1;
        state.items[payload.existingIndex].quantity = newQuantity;
      } else {
        // Add new item
        const newCartItem: CartItem = {
          product: payload.product,
          quantity: payload.quantity || 1,
        };
        state.items.push(newCartItem);
      }
    },

    // ❌ Complex mutation that either updates quantity or removes item
    removeCartItem(
      state: CartState,
      payload: { index: number; decrementOnly?: boolean }
    ) {
      if (payload.decrementOnly && state.items[payload.index].quantity > 1) {
        // Just decrement quantity
        state.items[payload.index].quantity--;
      } else {
        // Remove item completely
        state.items.splice(payload.index, 1);
      }
    },

    clearCart(state: CartState) {
      state.items = [];
    },
  },

  actions: {
    // Simplified actions (but mutations are now more complex)
    addToCart({ commit, state }: any, product: Product) {
      const existingItemIndex = state.items.findIndex(
        (item: CartItem) => item.product.id === product.id
      );

      // Single commit with complex payload
      commit("addToCart", {
        product,
        existingIndex: existingItemIndex !== -1 ? existingItemIndex : undefined,
      });
    },

    removeFromCart({ commit, state }: any, productId: number) {
      const existingItemIndex = state.items.findIndex(
        (item: CartItem) => item.product.id === productId
      );

      if (existingItemIndex !== -1) {
        // Single commit with complex payload
        commit("removeCartItem", {
          index: existingItemIndex,
          decrementOnly: true,
        });
      }
    },

    clearCart({ commit, state }: any, productId: number) {
      const existingItemIndex = state.items.findIndex(
        (item: CartItem) => item.product.id === productId
      );

      if (existingItemIndex !== -1) {
        commit("removeCartItem", {
          index: existingItemIndex,
          decrementOnly: false,
        });
      }
    },
  },
};
