<template>
  <!--
    Products.vue is the main product listing page.
    It displays all products in a responsive grid using the ProductCard component.
    Clicking a card navigates to the product details page.
    The Add to Cart button adds the product to the cart using Vuex.
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
        - @click.native allows clicking the card to navigate to details.
        ProductCard now handles add-to-cart directly via Vuex actions.
      -->
      <ProductCard
        v-for="product in items"
        :key="product.id"
        :product="product"
        @click="goToProduct(product.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
// Import Vue's defineComponent helper
import { defineComponent } from "vue";
// Import Vuex helper functions for accessing store
import { mapState, mapActions } from "vuex";
// Import the ProductCard component for displaying each product
import ProductCard from "../components/ProductCard.vue";

export default defineComponent({
  name: "ProductsPage", // Name of the page component
  components: { ProductCard }, // Register ProductCard as a child component
  computed: {
    // Map Vuex state to computed properties for products
    ...mapState("products", ["items"]),
  },

  methods: {
    // Map Vuex actions to component methods
    ...mapActions("products", ["fetchProducts"]), // Maps to this.$store.dispatch('products/fetchProducts')

    // Navigate to the product details page for the given product id
    // ProductCard now handles add-to-cart directly via Vuex actions
    goToProduct(id: number) {
      this.$router.push({ name: "ProductDetails", params: { id } });
    },
  },

  // Lifecycle hook - called when component is created
  async created() {
    // Fetch products from API when component is created
    await this.fetchProducts();
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
