<template>
  <div class="product-card">
    <img :src="product.image" alt="Product Image" class="product-card__image" />
    <h2 class="product-card__title">{{ product.title }}</h2>
    <p class="product-card__price">${{ product.price.toFixed(2) }}</p>
    <button
      class="product-card__button"
      @click.stop="$emit('add-to-cart', product)"
    >
      Add to Cart
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: ["add-to-cart"],
};
</script>

<style lang="scss" scoped>
.product-card {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &__image {
    width: 100%;
    max-width: 150px;
    height: 150px;
    border-radius: 4px;
    object-fit: contain;
  }
  &__title {
    margin: 1rem 0 0.5rem;
    font-size: 1.2rem;
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
