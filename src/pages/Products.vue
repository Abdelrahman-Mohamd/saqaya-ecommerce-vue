<template>
  <div class="products">
    <h1 class="products__title">Products</h1>
    <div class="products__grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
        @click.native="goToProduct(product.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "../store/cart";
import { useProductsStore } from "../store/products";
import { storeToRefs } from "pinia";
import ProductCard from "../components/ProductCard.vue";

export default defineComponent({
  name: "ProductsPage",
  components: { ProductCard },
  setup() {
    const cart = useCartStore();
    const productsStore = useProductsStore();
    const { products } = storeToRefs(productsStore);
    return {
      products,
      addToCart: cart.addToCart,
    };
  },
  methods: {
    goToProduct(id: number) {
      this.$router.push({ name: "ProductDetails", params: { id } });
    },
  },
});
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

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
}
</style>
