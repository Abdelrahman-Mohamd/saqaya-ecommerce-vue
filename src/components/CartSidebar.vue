<template>
  <!--
    CartSidebar.vue is a sliding cart panel that opens from the right side of the screen.
    It displays cart items with their images, titles, prices, and quantities.
    Users can modify quantities, remove items, and see the total price.
    The sidebar slides in/out with smooth CSS animations for better UX.
    
    Key Features:
    - Dark theme design matching modern e-commerce standards
    - Responsive layout that works on mobile and desktop
    - Real-time cart updates using Pinia store
    - Smooth slide-in/out animations
    - Quantity increment/decrement controls
    - Individual item removal functionality
    - Total price calculation and display
  -->

  <!-- 
    Overlay div that covers the entire screen when cart is open
    - Fixed positioning to cover viewport
    - Semi-transparent background to darken the main content
    - Click handler to close cart when clicking outside the sidebar
    - Only renders when isOpen prop is true (v-if directive)
  -->
  <div class="cart-sidebar-overlay" v-if="isOpen" @click="closeCart">
    <!-- 
      Main sidebar container that slides in from the right
      - @click.stop prevents event bubbling to parent overlay
      - This ensures clicking inside the sidebar doesn't close it
    -->
    <div class="cart-sidebar" @click.stop>
      <!-- 
        Header section with cart title and close button
        - Contains the cart title and close button
        - Fixed at the top of the sidebar
        - Dark themed with light text
      -->
      <div class="cart-sidebar__header">
        <!-- Main cart title - large, centered, white text -->
        <h2 class="cart-sidebar__title">Cart</h2>

        <!-- 
          Close button with X icon
          - Button element for accessibility (keyboard navigation)
          - aria-label for screen readers
          - Click handler emits close event to parent component
          - Uses Iconify icon for consistent styling
        -->
        <button
          class="cart-sidebar__close"
          @click="closeCart"
          aria-label="Close cart"
        >
          <!-- Material Design close icon with specific dimensions -->
          <Icon icon="mdi:close" width="24" height="24" />
        </button>
      </div>

      <!-- 
        Scrollable content area containing cart items or empty state
        - flex: 1 makes it take remaining height between header and footer
        - overflow-y: auto enables vertical scrolling when content exceeds height
        - Dark background matching the overall theme
      -->
      <div class="cart-sidebar__content">
        <!-- 
          Container for cart items - only shows when items exist
          - v-if="items.length > 0" conditionally renders this section
          - items comes from Pinia store via storeToRefs for reactivity
        -->
        <div v-if="items.length > 0" class="cart-sidebar__items">
          <!-- 
            Loop through each cart item and render individual item component
            - v-for iterates over items array from cart store
            - :key ensures Vue can track items efficiently for updates
            - Each item is a CartItem object with product and quantity properties
          -->
          <div v-for="item in items" :key="item.product.id" class="cart-item">
            <!-- 
              Product image display
              - :src binds to product image URL from API data
              - :alt provides accessibility description using product title
              - Fixed dimensions with object-fit: contain to maintain aspect ratio
              - White background to ensure images display well regardless of content
            -->
            <img
              :src="item.product.image"
              :alt="item.product.title"
              class="cart-item__image"
            />

            <!-- 
              Container for product information (title, price, quantity controls)
              - flex: 1 makes it take remaining space after image and remove button
              - Flexbox column layout to stack title, price, and quantity vertically
            -->
            <div class="cart-item__info">
              <!-- 
                Product title/name
                - h3 for semantic hierarchy (h2 is cart title)
                - White text for dark theme visibility
                - Line clamping to limit to 2 lines and add ellipsis for overflow
              -->
              <h3 class="cart-item__title">{{ item.product.title }}</h3>

              <!-- 
                Product price display
                - Shows individual item price (not total for quantity)
                - .toFixed(2) ensures consistent 2 decimal places
                - Light gray color for secondary information hierarchy
              -->
              <div class="cart-item__price">
                ${{ item.product.price.toFixed(2) }}
              </div>

              <!-- 
                Quantity control section with decrease/increase buttons
                - Horizontal layout using flexbox
                - Contains minus button, quantity display, and plus button
              -->
              <div class="cart-item__quantity">
                <!-- 
                  Decrease quantity button
                  - Calls decrementQuantity method with product ID
                  - Method handles removing one unit or entire item if quantity becomes 0
                  - Light colored button with dark text for contrast
                -->
                <button
                  class="cart-item__qty-btn"
                  @click="decrementQuantity(item.product.id)"
                >
                  -
                </button>

                <!-- 
                  Current quantity display
                  - Shows actual quantity number from cart store
                  - White text for visibility on dark background
                  - Centered text alignment with minimum width for consistency
                -->
                <span class="cart-item__qty">{{ item.quantity }}</span>

                <!-- 
                  Increase quantity button
                  - Calls incrementQuantity method with product ID
                  - Method adds one more unit of the same product to cart
                  - Same styling as decrease button for consistency
                -->
                <button
                  class="cart-item__qty-btn"
                  @click="incrementQuantity(item.product.id)"
                >
                  +
                </button>
              </div>
            </div>

            <!-- 
              Remove item button (trash can icon)
              - Completely removes this product from cart regardless of quantity
              - aria-label for screen reader accessibility
              - Uses trash can icon from Material Design set
              - Light color with red hover state to indicate destructive action
            -->
            <button
              class="cart-item__remove"
              @click="removeFromCart(item.product.id)"
              aria-label="Remove item"
            >
              <!-- Trash can outline icon with smaller dimensions than header icons -->
              <Icon icon="mdi:trash-can-outline" width="18" height="18" />
            </button>
          </div>
        </div>

        <!-- 
          Empty cart state - only shows when no items in cart
          - v-else corresponds to the v-if="items.length > 0" above
          - Centered layout with icon and message
          - Provides visual feedback and guidance to user
        -->
        <div v-else class="cart-sidebar__empty">
          <!-- 
            Large cart icon for empty state
            - Larger size (48x48) to draw attention
            - Cart outline icon to represent empty cart concept
            - Light opacity for subtle appearance
          -->
          <Icon
            icon="mdi:cart-outline"
            width="48"
            height="48"
            class="cart-sidebar__empty-icon"
          />

          <!-- 
            Empty cart message
            - Friendly message encouraging user to add items
            - Italic styling for softer, less formal tone
            - Light gray color for secondary text hierarchy
          -->
          <p class="cart-sidebar__empty-text">
            Your cart is empty, try to Add stuff.
          </p>
        </div>
      </div>

      <!-- 
        Footer section with total and checkout button
        - Only shows when items exist (same condition as items list)
        - Fixed at bottom of sidebar
        - Contains total price calculation and checkout action
        - Dark background with border separator from content
      -->
      <div v-if="items.length > 0" class="cart-sidebar__footer">
        <!-- 
          Total price display section
          - Horizontal layout with label on left and price on right
          - Larger font size to emphasize importance
          - White text for visibility on dark background
        -->
        <div class="cart-sidebar__total">
          <!-- Label for total amount -->
          <span class="cart-sidebar__total-label">Total:</span>

          <!-- 
            Calculated total price
            - Uses computed property that sums (price × quantity) for all items
            - .toFixed(2) ensures consistent currency formatting
            - White color to match the label and maintain hierarchy
          -->
          <span class="cart-sidebar__total-price"
            >${{ totalPrice.toFixed(2) }}</span
          >
        </div>

        <!-- 
          Checkout button
          - Full width button for easy clicking
          - Light colored button stands out against dark background
          - Currently just a button (could be enhanced to handle actual checkout)
          - Hover effect for interactive feedback
        -->
        <button class="cart-sidebar__checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Import Vue's defineComponent function for creating components with TypeScript support
import { defineComponent } from "vue";

// Import Icon component from Iconify for displaying SVG icons
// Iconify provides a vast library of icons that can be used as Vue components
import { Icon } from "@iconify/vue";

// Import the cart store to access cart state and methods
// This gives us access to cart items, add/remove functionality
import { useCartStore } from "../store/cart";

// Import storeToRefs to maintain reactivity when extracting properties from Pinia stores
// Without this, destructured properties would lose their reactive connection
import { storeToRefs } from "pinia";

// Import TypeScript type definition for cart items
// Ensures type safety when working with cart item objects
import type { CartItem } from "../types";

// Export the component definition using Vue 3's defineComponent helper
// This provides full TypeScript support and better developer experience
export default defineComponent({
  // Component name for debugging and Vue DevTools
  // Shows up in Vue DevTools component tree as "CartSidebar"
  name: "CartSidebar",

  // Register child components that this component will use in its template
  // These components become available as custom elements in the template
  components: {
    Icon, // Makes <Icon> available in template for displaying icons
  },

  // Define props that parent components can pass to this component
  // Props provide a way for parent-child component communication
  props: {
    // isOpen prop controls whether the sidebar is visible
    isOpen: {
      type: Boolean, // TypeScript type checking - must be boolean
      required: true, // This prop must be provided by parent component
    },
  },

  // Define custom events this component can emit to parent
  // Allows child-to-parent communication in Vue's data flow
  emits: ["close"], // Emits "close" event when user wants to close sidebar

  // Data function returns the component's reactive state
  // All properties returned here become reactive and available in template
  data() {
    // Get instance of the cart store to access cart state and methods
    // useCartStore() returns the singleton instance of our Pinia cart store
    const cartStore = useCartStore();

    // Extract reactive items array from cart store
    // storeToRefs ensures items remains reactive when destructured
    // Without storeToRefs, items would be a static snapshot instead of reactive
    const { items } = storeToRefs(cartStore);

    // Return object becomes component's reactive data
    return {
      items, // Reactive array of cart items from store
      cartStore, // Store instance for calling methods in component methods
    };
  },

  // Computed properties are reactive derived values
  // They automatically recalculate when their dependencies change
  computed: {
    // Calculate total price of all items in cart
    // This automatically updates whenever items array or quantities change
    totalPrice(): number {
      // Use Array.reduce to sum up (price × quantity) for each item
      return this.items.reduce(
        // Accumulator function: sum + (current item's price × quantity)
        (sum: number, item: CartItem) =>
          sum + item.product.price * item.quantity,
        0 // Initial value for the accumulator
      );
    },
  },

  // Methods object contains all component methods
  // These are functions that can be called from template or other methods
  methods: {
    // Close the cart sidebar
    // Emits "close" event to parent component (AppHeader)
    closeCart() {
      // $emit is Vue's method for emitting custom events to parent
      // Parent component listens with @close="handleClose"
      this.$emit("close");
    },

    // Remove a product completely from cart (all quantities)
    // Called when user clicks trash icon on cart item
    removeFromCart(productId: number) {
      // Call removeFromCart method on cart store
      // This removes one unit of the product (or entire item if quantity becomes 0)
      this.cartStore.removeFromCart(productId);
    },

    // Increase quantity of a specific product by 1
    // Called when user clicks "+" button on cart item
    incrementQuantity(productId: number) {
      // Find the cart item with matching product ID
      // items is reactive array from cart store
      const item = this.items.find((item) => item.product.id === productId);

      // If item exists in cart, add one more unit
      if (item) {
        // Call addToCart with the product object
        // Store logic handles incrementing existing item quantity
        this.cartStore.addToCart(item.product);
      }
    },

    // Decrease quantity of a specific product by 1
    // Called when user clicks "-" button on cart item
    decrementQuantity(productId: number) {
      // Call removeFromCart method on cart store
      // Store logic handles decrementing quantity or removing item if quantity becomes 0
      this.cartStore.removeFromCart(productId);
    },
  },
});
</script>

<style lang="scss" scoped>
/*
  SCSS Styles for CartSidebar Component
  
  This stylesheet uses SCSS (Sass) preprocessing for enhanced CSS features:
  - Nested selectors for better organization
  - Variables and mixins support
  - BEM naming methodology for consistent class naming
  - Scoped styles to prevent conflicts with other components
  
  Color Scheme (Dark Theme):
  - Primary Background: #4a5568 (dark slate gray)
  - Secondary Background: #718096 (medium gray)
  - Text Primary: #ffffff (white)
  - Text Secondary: #cbd5e0 (light gray)
  - Text Tertiary: #e2e8f0 (very light gray)
  - Borders: #718096, #a0aec0 (gray variations)
  - Accent: #fc8181 (light red for destructive actions)
*/

// Overlay that covers the entire screen when cart is open
.cart-sidebar-overlay {
  position: fixed; // Fixed positioning relative to viewport
  top: 0; // Stick to top edge of screen
  left: 0; // Stick to left edge of screen
  right: 0; // Stick to right edge of screen
  bottom: 0; // Stick to bottom edge of screen
  background: rgba(0, 0, 0, 0.5); // Semi-transparent black overlay
  z-index: 1000; // High z-index to appear above all other content
  display: flex; // Flexbox layout for alignment
  justify-content: flex-end; // Align sidebar to right side of screen
  animation: fadeIn 0.3s ease; // Smooth fade-in animation when appearing
}

// Main sidebar container that slides in from the right
.cart-sidebar {
  width: 400px; // Fixed width for desktop viewing
  max-width: 90vw; // Responsive max-width (90% of viewport width)
  height: 100vh; // Full viewport height
  background: #4a5568; // Dark gray background for main theme
  display: flex; // Flexbox layout for internal structure
  flex-direction: column; // Stack header, content, footer vertically
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1); // Left shadow for depth
  animation: slideInRight 0.3s ease; // Slide-in animation from right

  // Header section containing title and close button
  &__header {
    display: flex; // Flexbox for horizontal layout
    align-items: center; // Vertically center items
    justify-content: space-between; // Space between title and close button
    padding: 1.5rem; // Internal spacing (24px on all sides)
    border-bottom: 1px solid #718096; // Subtle border separator
    background: #4a5568; // Same as main background for consistency
  }

  // Cart title styling
  &__title {
    font-size: 3rem; // Large, prominent title (48px)
    font-weight: 600; // Semi-bold weight for emphasis
    color: #ffffff; // White text for dark background contrast
    margin: 0; // Remove default margin
    width: 100%; // Take full available width
    text-align: center; // Center the title text
  }

  // Close button styling
  &__close {
    background: none; // Remove default button background
    border: none; // Remove default button border
    cursor: pointer; // Show pointer cursor on hover
    padding: 0.5rem; // Internal padding for larger click area
    color: #cbd5e0; // Light gray color for icon
    border-radius: 50%; // Round button shape
    transition: background-color 0.2s; // Smooth background transition

    // Hover effect for interactive feedback
    &:hover {
      background: rgba(255, 255, 255, 0.1); // Semi-transparent white overlay
    }
  }

  // Scrollable content area
  &__content {
    flex: 1; // Take all remaining space between header and footer
    overflow-y: auto; // Enable vertical scrolling when content overflows
    padding: 1rem; // Internal spacing (16px)
    background: #4a5568; // Dark background matching theme
  }

  // Container for list of cart items
  &__items {
    display: flex; // Flexbox layout
    flex-direction: column; // Stack items vertically
    gap: 1rem; // Space between each cart item (16px)
  }

  // Empty cart state styling
  &__empty {
    display: flex; // Flexbox for centering
    flex-direction: column; // Stack icon and text vertically
    align-items: center; // Horizontally center content
    justify-content: center; // Vertically center content
    height: 100%; // Take full height of content area
    color: #cbd5e0; // Light gray text for secondary information
    text-align: center; // Center align text
  }

  // Empty cart icon styling
  &__empty-icon {
    margin-bottom: 1rem; // Space below icon (16px)
    opacity: 0.7; // Slightly transparent for subtle appearance
  }

  // Empty cart message styling
  &__empty-text {
    font-size: 1.1rem; // Slightly larger than normal text
    margin: 0; // Remove default paragraph margin
    font-style: italic; // Italic for softer, friendlier tone
  }

  // Footer section with total and checkout
  &__footer {
    padding: 1.5rem; // Internal spacing (24px)
    border-top: 1px solid #718096; // Top border separator
    background: #4a5568; // Dark background matching theme
  }

  // Total price display row
  &__total {
    display: flex; // Horizontal layout
    justify-content: space-between; // Push label left, price right
    align-items: center; // Vertically center align
    margin-bottom: 1rem; // Space below total row (16px)
    font-size: 1.2rem; // Larger text for emphasis
    font-weight: 600; // Semi-bold for importance
  }

  // "Total:" label styling
  &__total-label {
    color: #ffffff; // White text for visibility
  }

  // Total price value styling
  &__total-price {
    color: #ffffff; // White text matching label
  }

  // Checkout button styling
  &__checkout {
    width: 100%; // Full width of footer
    padding: 1rem; // Internal spacing (16px vertical, 16px horizontal)
    background: #e2e8f0; // Light gray background for contrast
    color: #2d3748; // Dark text for readability on light background
    border: none; // Remove default button border
    border-radius: 8px; // Rounded corners for modern appearance
    font-size: 1rem; // Standard font size
    font-weight: 500; // Medium font weight
    cursor: pointer; // Pointer cursor for interactivity
    transition: background-color 0.2s; // Smooth color transition

    // Hover effect for user feedback
    &:hover {
      background: #cbd5e0; // Darker gray on hover
    }
  }
}

// Individual cart item styling
.cart-item {
  display: flex; // Horizontal layout for image, info, and remove button
  gap: 1rem; // Space between child elements (16px)
  padding: 1rem; // Internal spacing (16px)
  background-color: #718096; // Medium gray background for item containers
  border-radius: 8px; // Rounded corners for modern card appearance
  border: 1px solid #a0aec0; // Subtle border for definition

  // Product image styling
  &__image {
    width: 60px; // Fixed width for consistency
    height: 60px; // Fixed height (square aspect ratio)
    object-fit: contain; // Maintain aspect ratio, fit within bounds
    border-radius: 4px; // Slightly rounded corners
    background-color: #fff; // White background for product images
  }

  // Container for product information
  &__info {
    flex: 1; // Take remaining space after image and remove button
    display: flex; // Flexbox layout
    flex-direction: column; // Stack title, price, quantity vertically
    gap: 0.5rem; // Space between info elements (8px)
  }

  // Product title styling
  &__title {
    font-size: 0.9rem; // Slightly smaller font for secondary information
    font-weight: 500; // Medium weight for readability
    color: #ffffff; // White text for dark background
    margin: 0; // Remove default heading margin
    line-height: 1.3; // Tighter line height for compact display
    display: -webkit-box; // Enable webkit box model for line clamping
    -webkit-line-clamp: 2; // Limit to 2 lines maximum
    line-clamp: 2; // Standard line-clamp property
    -webkit-box-orient: vertical; // Vertical box orientation for clamping
    overflow: hidden; // Hide overflow text
  }

  // Product price styling
  &__price {
    font-weight: 600; // Semi-bold for emphasis
    color: #e2e8f0; // Very light gray for secondary information
  }

  // Quantity controls container
  &__quantity {
    display: flex; // Horizontal layout for buttons and quantity
    align-items: center; // Vertically center align items
    gap: 0.5rem; // Space between quantity controls (8px)
  }

  // Quantity increment/decrement buttons
  &__qty-btn {
    width: 28px; // Fixed square width
    height: 28px; // Fixed square height
    border: 1px solid #a0aec0; // Light gray border
    background: #e2e8f0; // Light gray background for contrast
    border-radius: 4px; // Slightly rounded corners
    cursor: pointer; // Pointer cursor for interactivity
    display: flex; // Flexbox for centering content
    align-items: center; // Vertically center the +/- symbol
    justify-content: center; // Horizontally center the +/- symbol
    font-weight: 500; // Medium weight for button text
    color: #2d3748; // Dark text for readability
    transition: all 0.2s; // Smooth transition for all properties

    // Hover effect for interactive feedback
    &:hover {
      background: #cbd5e0; // Darker gray background on hover
      border-color: #a0aec0; // Maintain border color
    }
  }

  // Quantity display styling
  &__qty {
    min-width: 24px; // Minimum width to prevent layout shifts
    text-align: center; // Center the quantity number
    font-weight: 500; // Medium weight for emphasis
    color: #ffffff; // White text for visibility
  }

  // Remove item button styling
  &__remove {
    background: none; // Remove default button background
    border: none; // Remove default button border
    cursor: pointer; // Pointer cursor for interactivity
    color: #cbd5e0; // Light gray for subtle appearance
    padding: 0.5rem; // Padding for larger click area
    border-radius: 4px; // Slightly rounded corners
    transition: all 0.2s; // Smooth transition for hover effects

    // Hover effect indicating destructive action
    &:hover {
      color: #fc8181; // Light red color on hover (danger indication)
    }
  }
}

// Animation keyframes for smooth entrance effects

// Fade-in animation for overlay background
@keyframes fadeIn {
  from {
    opacity: 0; // Start completely transparent
  }
  to {
    opacity: 1; // End fully opaque
  }
}

// Slide-in animation for sidebar from right side
@keyframes slideInRight {
  from {
    transform: translateX(
      100%
    ); // Start positioned completely off-screen to the right
  }
  to {
    transform: translateX(0); // End in normal position
  }
}

// Mobile responsiveness for smaller screens
@media (max-width: 480px) {
  // Adjust sidebar for mobile devices
  .cart-sidebar {
    width: 100vw; // Full viewport width on mobile
    max-width: 100vw; // Override max-width for full screen

    // Reduce header padding for mobile
    &__header {
      padding: 1rem; // Smaller padding (16px instead of 24px)
    }

    // Reduce content padding for mobile
    &__content {
      padding: 0.5rem; // Smaller padding (8px instead of 16px)
    }

    // Reduce footer padding for mobile
    &__footer {
      padding: 1rem; // Smaller padding (16px instead of 24px)
    }
  }

  // Adjust cart items for mobile
  .cart-item {
    padding: 0.75rem; // Reduced padding (12px instead of 16px)
    gap: 0.75rem; // Reduced gap (12px instead of 16px)

    // Smaller images on mobile
    &__image {
      width: 50px; // Smaller width (50px instead of 60px)
      height: 50px; // Smaller height (50px instead of 60px)
    }

    // Smaller title text on mobile
    &__title {
      font-size: 0.85rem; // Reduced font size for mobile screens
    }
  }
}
</style>
