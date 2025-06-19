<template>
  <header class="header">
    <div class="header__container">
      <!-- Hamburger for mobile -->
      <button
        class="header__menu-btn"
        @click="toggleMenu"
        aria-label="Open menu"
      >
        <Icon icon="mdi:menu" width="28" height="28" />
      </button>

      <!-- Logo - shows on desktop and mobile (centered) -->
      <a href="/products" class="header__logo" aria-label="Home">
        <Icon icon="mdi:alpha-h-box" width="32" height="32" />
      </a>

      <!-- Desktop nav -->
      <nav class="header__nav">
        <a class="header__link" href="/products">Products</a>
        <a class="header__link" href="/contact-us">Contact Us</a>
      </nav>

      <!-- Actions (Sign In + Cart) -->
      <div class="header__actions">
        <a class="header__signin" href="#">Sign In</a>
        <a class="header__cart" href="/cart" title="Cart">
          <Icon icon="mdi:cart-outline" width="24" height="24" />
        </a>
      </div>
    </div>

    <!-- Mobile nav overlay -->
    <transition name="fade">
      <div v-if="menuOpen" class="header__mobile-menu">
        <a class="header__link" href="/products">Products</a>
        <a class="header__link" href="/contact-us">Contact Us</a>
      </div>
    </transition>
  </header>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";

export default {
  name: "AppHeader",
  // This is a required step when you want to use any custom components or third-party components within your component's template.
  components: {
    Icon,
  },

  data() {
    return {
      menuOpen: false,
    };
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.menuOpen = false;
      }
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
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
      left: 50%;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
