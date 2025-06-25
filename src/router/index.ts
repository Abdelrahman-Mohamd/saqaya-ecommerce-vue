// Import the functions to create a Vue Router instance and use HTML5 history mode
import { createRouter, createWebHistory } from "vue-router";
// Import the page components that will be rendered for each route
import Products from "../pages/Products.vue";
import ContactUs from "../pages/ContactUs.vue";
import ProductDetails from "../pages/ProductDetails.vue";

// Define the application's routes as an array of route objects
const routes = [
  { path: "/", redirect: "/products" }, // Redirect root to /products
  { path: "/products", name: "Products", component: Products }, // Product listing page (name: is a unique name to reference this route)
  { path: "/products/:id", name: "ProductDetails", component: ProductDetails }, // Product details page (dynamic id)
  { path: "/contact-us", name: "ContactUs", component: ContactUs }, // Contact page
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode (clean URLs), This gives you clean URLs like /products, /cart, etc. — without a # (hash)
  routes, // Register the routes defined above
});

// Export the router so it can be used in main.ts
export default router;
