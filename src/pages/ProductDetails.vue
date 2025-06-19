<template>
  <div class="product-details" v-if="product">
    <img
      :src="product.image"
      :alt="product.title"
      class="product-details__image"
    />
    <div class="product-details__info">
      <h1 class="product-details__title">{{ product.title }}</h1>
      <p class="product-details__price">${{ product.price.toFixed(2) }}</p>
      <p class="product-details__description">{{ product.description }}</p>
      <p class="product-details__category">Category: {{ product.category }}</p>
      <p class="product-details__rating">
        Rating: {{ product.rating.rate }} ({{ product.rating.count }} reviews)
      </p>
    </div>
  </div>
  <div v-else class="product-details__notfound">Product not found.</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProductsStore } from "../store/products";
import type { Product } from "../store/cart";

export default defineComponent({
  name: "ProductDetailsPage",
  data() {
    return {
      product: null as Product | null,
    };
  },
  created() {
    const id = Number(this.$route.params.id);
    const productsStore = useProductsStore();
    this.product = productsStore.getById(id);
  },
});
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
    object-fit: contain;
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
