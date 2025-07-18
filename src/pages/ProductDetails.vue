<template>
  <!--
    ProductDetails.vue displays detailed information about a single product.
    It fetches the product by id from the route params using the products Vuex store.
    If the product is found, it shows all details; otherwise, it shows a not found message.
  -->
  <div class="product-details" v-if="product">
    <!-- Product image -->
    <img
      :src="product.image"
      :alt="product.title"
      class="product-details__image"
    />
    <div class="product-details__info">
      <!-- Product title -->
      <h1 class="product-details__title">{{ product.title }}</h1>
      <!-- Product price -->
      <p class="product-details__price">${{ product.price.toFixed(2) }}</p>
      <!-- Product description -->
      <p class="product-details__description">{{ product.description }}</p>
      <!-- Product category -->
      <p class="product-details__category">Category: {{ product.category }}</p>
      <!-- Product rating -->
      <p class="product-details__rating">
        Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
      </p>
    </div>
  </div>
  <!-- Show this if the product is not found -->
  <div v-else class="product-details__notfound">Product not found.</div>
</template>

<script lang="ts">
// Import Vuex helper functions for accessing store
import { mapActions } from "vuex";
// Import the Product type for type safety
import type { Product } from "../types";

export default {
  name: "ProductDetailsPage", // Name of the page component
  data() {
    return {
      //I am initializing product with a value of null, but I want TypeScript to know
      // that later it might hold a Product object or still be null.
      product: null as Product | null,
    };
  },

  methods: {
    // Map Vuex actions to component methods
    ...mapActions("products", [
      "fetchProductById", // Add the more efficient action
    ]),
  },

  //You want this to happen as soon as the component loads (before rendering anything)
  //You're not waiting for DOM elements, so created() is perfect.
  async created() {
    // Get the product id from the route params
    const id = Number(this.$route.params.id);

    // Use fetchProductById
    // This will check state first, then fetch from API only if needed
    try {
      this.product = await this.fetchProductById(id);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      // this.product remains null, so "Product not found" will show
    }
  },
};
</script>

<style lang="scss" scoped>
.product-details {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  &__image {
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
    margin-bottom: 2rem;
    object-fit: contain; //to keep the image contained within the image container
  }
  &__info {
    width: 100%;
    text-align: center;
  }
  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  &__price {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  &__description {
    margin-bottom: 1rem;
  }
  &__category {
    color: #888;
    margin-bottom: 0.5rem;
  }
  &__rating {
    color: #555;
    margin-bottom: 1rem;
  }
  &__notfound {
    text-align: center;
    color: #c00;
    font-size: 1.2rem;
    margin: 2rem 0;
  }

  @media (min-width: 700px) {
    flex-direction: row;
    align-items: flex-start;
    &__image {
      margin-bottom: 0;
      margin-right: 2rem;
      max-width: 350px;
      width: 350px;
      height: 350px;
    }
    &__info {
      text-align: left;
      width: auto;
    }
  }
  @media (max-width: 700px) {
    padding: 1rem;
    &__image {
      max-width: 180px;
      width: 100%;
      height: 180px;
    }
    &__title {
      font-size: 1.2rem;
    }
    &__price {
      font-size: 1rem;
    }
  }
}
</style>
