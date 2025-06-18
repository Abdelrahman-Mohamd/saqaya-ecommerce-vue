<template>
  <div class="contact">
    <h1 class="contact__title">Contact Us</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: "ContactPage",
};
</script>

<style lang="scss" scoped>
.contact {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;

  &__title {
    text-align: center;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .contact {
    margin: 1rem auto;
  }
}
</style>
