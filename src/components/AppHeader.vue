<template>
  <!--
    AppHeader.vue is the main site header/navigation bar.
    It includes a logo, navigation links, sign-in, and cart actions.
    On mobile, it shows a hamburger menu and overlays the nav links.
  -->
  <header class="header">
    <div class="header__container">
      <!-- Hamburger for mobile navigation (hidden on desktop) -->
      <button
        class="header__menu-btn"
        @click="toggleMenu"
        aria-label="Open menu"
      >
        <Icon icon="mdi:menu" width="28" height="28" />
      </button>

      <!-- Logo (centered on mobile, left on desktop) -->
      <a href="/products" class="header__logo" aria-label="Home">
        <Icon icon="mdi:alpha-h-box" width="32" height="32" />
      </a>

      <!-- Desktop navigation links -->
      <nav class="header__nav">
        <a class="header__link" href="/products">Products</a>
        <a class="header__link" href="/contact-us">Contact Us</a>
      </nav>

      <!-- Actions: Sign In and Cart -->
      <div class="header__actions">
        <a class="header__signin" href="#">Sign In</a>
        <a class="header__cart" href="/cart" title="Cart">
          <Icon icon="mdi:cart-outline" width="24" height="24" />
        </a>
      </div>
    </div>

    <!-- Mobile nav overlay (shows when menuOpen is true) -->
    <!--This tells Vue to apply transition classes when the element appears or disappears. -->
    <transition name="fade">
      <div v-if="menuOpen" class="header__mobile-menu">
        <a class="header__link" href="/products">Products</a>
        <a class="header__link" href="/contact-us">Contact Us</a>
      </div>
    </transition>
  </header>
</template>

<script lang="ts">
// Import the Icon component from Iconify for SVG icons
import { Icon } from "@iconify/vue";

export default {
  name: "AppHeader", // Name of the component
  // Register Icon as a child component
  components: {
    Icon,
  },
  data() {
    return {
      menuOpen: false, // Controls visibility of the mobile menu
    };
  },
  methods: {
    // Toggle the mobile menu open/closed
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    // Close the mobile menu if resizing to desktop
    handleResize() {
      if (window.innerWidth > 768) {
        this.menuOpen = false;
      }
    },
  },
  mounted() {
    // Listen for window resize to close mobile menu on desktop
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // Clean up the event listener
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
//
// AppHeader styles use BEM naming and are fully responsive.
//
.header {
  background: #fafafa; // Light background
  border-bottom: 1px solid #e0e0e0; // Subtle border
  width: 100%;
  position: relative;
  z-index: 100;

  &__container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    width: 100%;
    position: relative;
    box-sizing: border-box;
  }

  &__logo {
    display: flex;
    align-items: center;
    margin-right: 2rem;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex: 1;
    justify-content: flex-start;
  }

  &__link {
    color: #222;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: auto;
  }

  &__signin {
    color: #2d3a4a;
    font-weight: 500;
    text-decoration: none;
    font-size: 0.95rem;
    white-space: nowrap;

    &:hover {
      text-decoration: underline;
    }
  }

  &__cart {
    display: flex;
    align-items: center;
    color: #222;
  }

  &__menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    color: #222;
  }

  &__mobile-menu {
    display: none;
  }
}

// Responsive styles
@media (max-width: 900px) {
  .header .header__nav {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .header {
    .header__container {
      padding: 0.75rem 1rem;
      justify-content: space-between;
    }

    &__logo {
      position: absolute;
      //It positions the left edge of the element at the center of its parent (50% from the left side).
      left: 50%;
      //This pulls the element back to the left by 50% of its own width — effectively centering it.
      transform: translateX(-50%);
      margin: 0;
    }

    &__nav {
      display: none !important;
    }

    &__menu-btn {
      display: flex !important;
      order: 1;
      margin: 0;
      z-index: 2;
    }

    &__actions {
      order: 3;
      gap: 0.75rem;
      margin-left: 0;
      z-index: 2;
    }

    &__mobile-menu {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: #fafafa;
      border-bottom: 1px solid #e0e0e0;
      z-index: 100;
      padding: 1rem;
      gap: 1.2rem;
      align-items: flex-start;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      box-sizing: border-box;
    }
  }
}

@media (max-width: 480px) {
  .header {
    &__container {
      padding: 0.75rem 0.75rem;
    }

    &__actions {
      gap: 0.5rem;
    }

    &__signin {
      font-size: 0.9rem;
    }
  }
}

// Transition for mobile menu
// Controls the animation duration and easing
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

// Starting state (when appearing) & Ending state (when disappearing)
.fade-enter-from,   // Initial state: element is hidden (opacity 0)
.fade-leave-to {
  // Final state: fade out to hidden (opacity 0)
  opacity: 0;
}
</style>
