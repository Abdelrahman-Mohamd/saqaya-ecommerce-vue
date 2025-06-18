import { createRouter, createWebHistory } from "vue-router";
import Products from "../pages/Products.vue";
import Cart from "../pages/Cart.vue";
import ContactUs from "../pages/ContactUs.vue";
import ProductDetails from "../pages/ProductDetails.vue";

const routes = [
  { path: "/", redirect: "/products" },
  { path: "/products", name: "Products", component: Products },
  { path: "/products/:id", name: "ProductDetails", component: ProductDetails },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/contact-us", name: "ContactUs", component: ContactUs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
