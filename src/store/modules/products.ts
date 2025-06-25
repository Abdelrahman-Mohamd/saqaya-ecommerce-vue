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
  // Module mutations - products-specific state changes (ONLY state modifications)
  mutations: {
    //  Set the entire products array (from API)
    setProducts(state: ProductsState, products: Product[]) {
      state.items = products;
    },

    //  Add a new product to the array
    addProduct(state: ProductsState, product: Product) {
      state.items.push(product);
    },

    // Update existing product by index
    updateProduct(
      state: ProductsState,
      { index, product }: { index: number; product: Product }
    ) {
      state.items[index] = product;
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

    // Fetch a single product by ID (async action with business logic)
    async fetchProductById({ commit, state }: any, productId: number) {
      try {
        // Check if product already exists in state
        const existingProductIndex = state.items.findIndex(
          (p: Product) => p.id === productId
        );
        if (existingProductIndex !== -1) {
          // Product exists, return it without API call
          return state.items[existingProductIndex];
        }

        // Product not in state, fetch from API
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        if (!res.ok) throw new Error(`Failed to fetch product ${productId}`);
        const product = await res.json();

        // Business logic: Add new product to state
        commit("addProduct", product);
        return product;
      } catch (err) {
        console.error(`Error fetching product ${productId}:`, err);
        throw err;
      }
    },

    // Update existing product
    updateExistingProduct({ commit, state }: any, updatedProduct: Product) {
      //  Find the product to update
      const existingProductIndex = state.items.findIndex(
        (p: Product) => p.id === updatedProduct.id
      );

      if (existingProductIndex !== -1) {
        // Business logic: Product found, update it
        commit("updateProduct", {
          index: existingProductIndex,
          product: updatedProduct,
        });
        return updatedProduct;
      } else {
        // Business logic: Product not found, add it as new
        commit("addProduct", updatedProduct);
        return updatedProduct;
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
