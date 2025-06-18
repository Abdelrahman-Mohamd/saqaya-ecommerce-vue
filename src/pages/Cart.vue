<template>
  <div class="cart">
    <h1 class="cart__title">Shopping Cart</h1>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;

  &__title {
    text-align: center;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .cart {
    margin: 1rem auto;
  }
}
</style>
