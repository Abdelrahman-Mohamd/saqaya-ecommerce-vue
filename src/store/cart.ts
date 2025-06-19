import { defineStore } from "pinia";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useCartStore = defineStore("cart", {
  state: (): { items: Product[] } => ({
    items: [],
  }),
  actions: {
    addToCart(product: Product) {
      this.items.push(product);
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
  },
});
