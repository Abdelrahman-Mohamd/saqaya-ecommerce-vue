<template>
  <div class="products">
    <h1 class="products__title">Products</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: "ProductsPage",
};
</script>

<style lang="scss" scoped>
.products {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;

  &__title {
    text-align: center;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .products {
    margin: 1rem auto;
  }
}
</style>
