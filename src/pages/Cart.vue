<template>
  <!--
    Cart.vue displays the user's shopping cart.
    It lists all products in the cart, allows removing items, and shows the total price.
    If the cart is empty, a message is shown.
  -->
  <div class="cart">
    <h1 class="cart__title">Shopping Cart</h1>
    <!-- If there are items in the cart, show the table -->
    <div v-if="items.length > 0">
      <table class="cart__table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.product.id">
            <td class="cart__product">
              <img
                :src="item.product.image"
                :alt="item.product.title"
                class="cart__image"
              />
              <span class="cart__name">{{ item.product.title }}</span>
            </td>
            <td class="cart__price">${{ item.product.price.toFixed(2) }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ (item.product.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button
                class="cart__remove"
                @click="removeFromCart(item.product.id)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="cart__total">
        <span>Total:</span>
        <span class="cart__total-price">${{ totalPrice.toFixed(2) }}</span>
      </div>
    </div>
    <!-- If the cart is empty, show a message -->
    <div v-else class="cart__empty">Your cart is empty.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCartStore } from "../store/cart";
import { storeToRefs } from "pinia";
import type { CartItem } from "../store/cart";

export default defineComponent({
  name: "CartPage",
  data() {
    const cartStore = useCartStore();
    const { items } = storeToRefs(cartStore);
    return {
      items,
    };
  },
  computed: {
    // Calculate the total price of all items in the cart
    totalPrice(): number {
      return this.items.reduce(
        (sum: number, item: CartItem) =>
          sum + item.product.price * item.quantity,
        0
      );
    },
  },
  methods: {
    // Remove a single quantity of an item from the cart by product id
    removeFromCart(id: number) {
      const cartStore = useCartStore();
      cartStore.removeFromCart(id);
    },
  },
});
</script>

<style lang="scss" scoped>
.cart {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;

  &__title {
    text-align: center;
    margin-bottom: 2rem;
  }
  &__table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    overflow: hidden;
  }
  th,
  td {
    padding: 1rem;
    text-align: left;
  }
  th {
    background: #f5f5f5;
    font-weight: 600;
    color: #343754;
  }
  &__product {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  &__image {
    width: 60px;
    height: 60px;
    object-fit: contain;
    border-radius: 4px;
  }
  &__name {
    font-weight: 500;
    color: #222;
  }
  &__price {
    color: #343754;
    font-weight: 500;
  }
  &__remove {
    background: #c00;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
    &:hover {
      background: #a00;
    }
  }
  &__total {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: #343754;
    margin-bottom: 2rem;
  }
  &__total-price {
    color: #2ecc40;
  }
  &__empty {
    text-align: center;
    color: #888;
    font-size: 1.1rem;
    margin: 2rem 0;
  }
}
@media (max-width: 700px) {
  .cart__table th,
  .cart__table td {
    padding: 0.5rem;
  }
  .cart__image {
    width: 40px;
    height: 40px;
  }
}
</style>
