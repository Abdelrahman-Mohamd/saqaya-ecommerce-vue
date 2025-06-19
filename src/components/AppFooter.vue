<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Top section with 3 columns -->
      <div class="footer__top-columns">
        <!-- Navigation Column -->
        <div class="footer__column">
          <h3 class="footer__title">Navigate</h3>
          <nav class="footer__nav">
            <a href="/about" class="footer__link">About Us</a>
            <a href="/blog" class="footer__link">Blog</a>
            <a href="/contact" class="footer__link">Contact Us</a>
            <a href="/sitemap" class="footer__link">Sitemap</a>
          </nav>
        </div>

        <!-- Collection Column -->
        <div class="footer__column">
          <h3 class="footer__title">Collection</h3>
          <nav class="footer__nav">
            <a href="/new-arrivals" class="footer__link">New arrivals</a>
            <a href="/featured" class="footer__link">Featured</a>
            <a href="/catalog" class="footer__link">Catalog</a>
            <a href="/brands" class="footer__link">Brands</a>
          </nav>
        </div>

        <!-- Categories Column -->
        <div class="footer__column">
          <h3 class="footer__title">Categories</h3>
          <nav class="footer__nav">
            <a href="/tables" class="footer__link">Tables</a>
            <a href="/lamps" class="footer__link">Lamps</a>
            <a href="/chairs" class="footer__link">Chairs</a>
            <a href="/sofas" class="footer__link">Sofas</a>
          </nav>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="footer__column footer__column--contact">
        <address class="footer__address">
          <p>399 Crowfield Road,</p>
          <p>Phoenix, Arizona 85012</p>
          <div class="footer__contact">
            <a
              href="mailto:asf@efrls5dc.com"
              class="footer__link footer__link--email"
              >asf@efrls5dc.com</a
            >
            <a href="tel:+602-926-5809" class="footer__link">+602-926-5809</a>
          </div>
        </address>
      </div>

      <!-- Bottom section -->
      <div class="footer__bottom">
        <p class="footer__copyright">Copyright © All Rights Reserved 2020</p>
        <div class="footer__social">
          <h3 class="footer__social-title">Get social</h3>
          <div class="footer__social-links">
            <a href="#" class="footer__social-link" aria-label="Twitter">
              <Icon icon="mdi:twitter" />
            </a>
            <a href="#" class="footer__social-link" aria-label="Pinterest">
              <Icon icon="mdi:pinterest" />
            </a>
            <a href="#" class="footer__social-link" aria-label="Facebook">
              <Icon icon="mdi:facebook" />
            </a>
            <a href="#" class="footer__social-link" aria-label="Instagram">
              <Icon icon="mdi:instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";

export default {
  name: "AppFooter",
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background: #343754;
  color: #fff;
  padding: 4rem 1.5rem 2rem;
  width: 100%;
  box-sizing: border-box;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  &__column {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &--contact {
      text-align: right;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  &__top-columns {
    display: contents; // This makes it not affect the grid layout on desktop
  }

  &__title {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0 0 1rem;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__address {
    font-style: normal;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1.5rem;

    p {
      margin: 0;
      color: #a1a3b7;
      line-height: 1.5;
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;

    .footer__link {
      display: block;
    }
  }

  &__link {
    color: #a1a3b7;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.2s;
    line-height: 1.5;

    &:hover {
      color: #fff;
    }

    &--email {
      color: #6b8cef;
    }
  }

  &__social {
    text-align: right;

    &-title {
      color: #fff;
      font-size: 1.2rem;
      font-weight: 500;
      margin: 0;
      text-align: right;
      line-height: 1;
    }

    &-links {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    &-link {
      color: #a1a3b7;
      font-size: 1.5rem;
      transition: color 0.2s;
      line-height: 1;

      &:hover {
        color: #fff;
      }
    }
  }

  &__bottom {
    grid-column: 1 / -1;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__copyright {
    color: #a1a3b7;
    margin: 0;
    font-size: 0.9rem;
    padding-top: 0.3rem; // Align with "Get social" text
  }

  // Mobile styles
  @media (max-width: 900px) {
    .footer {
      padding: 3rem 1.5rem 2rem;

      &__container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      &__top-columns {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }

      &__column--contact {
        text-align: left;
        margin: 2rem 0;
      }

      &__bottom {
        margin-top: 0;
        padding-top: 1.5rem;
        align-items: flex-start;
      }

      &__social {
        text-align: left;

        &-title {
          font-size: 1.1rem;
          margin: 0;
          display: inline-block;
          margin-right: 1rem;
          text-align: left;
        }

        &-links {
          display: inline-flex;
          justify-content: flex-start;
          gap: 1rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .footer {
      padding: 2rem 1rem 1.5rem;

      &__top-columns {
        gap: 0.75rem;
      }

      &__title {
        font-size: 1.1rem;
        margin: 0 0 0.75rem;
      }

      &__nav {
        gap: 0.5rem;
      }

      &__link {
        font-size: 0.95rem;
      }
    }
  }
}
</style>
