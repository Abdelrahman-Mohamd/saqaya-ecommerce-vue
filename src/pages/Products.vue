<template>
  <!--
    Products.vue is the main product listing page.
    It displays all products in a responsive grid using the ProductCard component.
    Clicking a card navigates to the product details page.
    The Add to Cart button adds the product to the cart using Pinia.
  -->
  <div class="products">
    <!-- Page title -->
    <h1 class="products__title">Products</h1>
    <!-- Responsive grid of product cards -->
    <div class="products__grid">
      <!--
        Loop through all products and render a ProductCard for each one.
        - :key gives each card a unique identifier for Vue's reactivity.
        - :product passes the product data as a prop to ProductCard.
        - @add-to-cart listens for the custom event from ProductCard.
        - @click.native allows clicking the card to navigate to details.
      -->
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
        @click="goToProduct(product.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { Product } from "../types"; // Import the Product type for type safety
// Import Vue's defineComponent helper
import { defineComponent } from "vue";
// Import the cart store for add-to-cart functionality
import { useCartStore } from "../store/cart";
// Import the products store for product data
import { useProductsStore } from "../store/products";

// Import storeToRefs to get reactive references from Pinia stores
// sometimes you want to extract individual properties from the store while keeping reactivity.
// That’s exactly what storeToRefs() does:
// It converts all reactive state and getters into separate ref()s,
//  so you can destructure them safely in your component and access them.
// it is okay if you didn't want to destrcuture the store properties.
import { storeToRefs } from "pinia";
// Import the ProductCard component for displaying each product
import ProductCard from "../components/ProductCard.vue";

export default defineComponent({
  name: "ProductsPage", // Name of the page component
  components: { ProductCard }, // Register ProductCard as a child component
  data() {
    // Access the products store and get a reactive reference to products
    const productsStore = useProductsStore();
    const { products } = storeToRefs(productsStore);
    // Fetch products from API when component is created
    productsStore.fetchProducts();
    return {
      products, // All products to display
    };
  },
  methods: {
    // Add a product to the cart using the cart store
    addToCart(product: Product) {
      const cart = useCartStore();
      cart.addToCart(product);
    },
    // Navigate to the product details page for the given product id
    goToProduct(id: number) {
      this.$router.push({ name: "ProductDetails", params: { id } });
    },
  },
});
</script>

<style lang="scss" scoped>
.products {
  max-width: 1200px; // Limit the width of the product grid
  margin: 2rem auto; // Center the grid with margin
  padding: 0 1rem; // Add horizontal padding

  &__title {
    text-align: center; // Center the page title
    margin-bottom: 2rem; // Space below the title
  }

  &__grid {
    display: grid; // Use CSS grid for layout

    // fit as many columns as possible, but each column must be at least 250px wide
    // and can grow to fill extra space.
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    ); // Responsive columns
    gap: 2rem; // Space between cards
  }
}
</style>
