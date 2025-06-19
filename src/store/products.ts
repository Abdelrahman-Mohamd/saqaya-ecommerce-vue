// Import defineStore from Pinia to create a store
import { defineStore } from "pinia";
// Import the Product type for strong typing
import type { Product } from "./cart";

// Centralized static product data array
// This array contains all products available in the store
const products: Product[] = [
  {
    id: 1, // Unique product ID
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", // Product name
    price: 109.95, // Product price
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", // Product description
    category: "men's clothing", // Product category
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Product image URL
    rating: { rate: 3.9, count: 120 }, // Product rating (rate and count)
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  },
];

// Create a Pinia store for products
export const useProductsStore = defineStore("products", {
  // State contains the array of products
  state: (): { products: Product[] } => ({
    products, // All products available in the store
  }),
  // Getters are like computed properties for the store
  getters: {
    // getById returns a product by its id, or null if not found
    getById: (state) => (id: number) =>
      state.products.find((p) => p.id === id) || null,
  },
});
