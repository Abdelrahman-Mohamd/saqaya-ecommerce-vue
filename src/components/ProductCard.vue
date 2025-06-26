<template>
  <!--
    ProductCard.vue is a reusable component for displaying a single product in a card format.
    It receives a product object as a prop and emits an event when the Add to Cart button is clicked.
  -->
  <div class="product-card">
    <!-- Product image -->
    <img :src="product.image" alt="Product Image" class="product-card__image" />
    <!-- Product title -->
    <h2 class="product-card__title">{{ product.title }}</h2>
    <!-- Product rating -->
    <div class="product-card__rating">
      <span class="product-card__rating-stars">
        {{ filledStars }}{{ emptyStars }}
      </span>
      <span class="product-card__rating-text">
        {{ product.rating.rate.toFixed(1) }} ({{ product.rating.count }})
      </span>
    </div>
    <!-- Product price -->
    <p class="product-card__price">${{ product.price.toFixed(2) }}</p>
    <!-- Add to Cart button (calls Vuex action directly) -->
    <!-- stopPropagation using .stop to prevent event bubbling to parent -->
    <button class="product-card__button" @click.stop="addToCart(product)">
      Add to Cart
    </button>
  </div>
</template>

<script lang="ts">
import { mapActions } from "vuex";

export default {
  // Name of the component
  name: "ProductCard",
  // Props received from the parent (expects a product object)
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  
  computed: {
    // Calculate filled stars based on rating
    filledStars() {
      const rating = Math.round(this.product.rating.rate);
      return '★'.repeat(rating);
    },
    
    // Calculate empty stars
    emptyStars() {
      const rating = Math.round(this.product.rating.rate);
      return '☆'.repeat(5 - rating);
    },
  },
  
  methods: {
    // Map Vuex actions from cart module to component methods (using namespace)
    ...mapActions("cart", ["addToCart"]),
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  background: #fff; // Card background color
  border-radius: 8px; // Rounded corners
  padding: 1rem; // Inner spacing
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Subtle shadow
  display: flex; // Use flexbox for layout
  flex-direction: column; // Stack children vertically
  align-items: center; // Center content horizontally
  cursor: pointer; // Show pointer cursor on hover

  &__image {
    width: 100%;
    max-width: 150px;
    height: 150px;
    border-radius: 4px;
    object-fit: contain; // Ensure image fits nicely
  }
  &__title {
    margin: 1rem 0 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    white-space: nowrap; // Prevents wrapping
    overflow: hidden; // Hides overflow text
    text-overflow: ellipsis; // Adds ... for overflow
    width: 100%; // Ensures ellipsis works for long titles
    display: block;
  }
  
  &__rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5rem;
    
    &-stars {
      color: #ffc107; // Gold color for filled stars
      font-size: 1rem;
      margin-bottom: 0.2rem;
      letter-spacing: 1px;
      font-weight: bold;
    }
    
    &-text {
      font-size: 0.9rem;
      color: #666;
      text-align: center;
    }
  }
  
  &__description {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }
  &__price {
    font-size: 1.1rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  &__button {
    width: 100%;
    padding: 0.5rem;
    background: #343754;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
    &:hover {
      background: #545986;
    }
  }
}
</style>
