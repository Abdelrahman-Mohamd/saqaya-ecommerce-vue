<template>
  <!--
    ContactUs.vue displays a contact form for users to send messages.
    The form includes fields for name, email, and message, with basic validation.
    Shows a success message after submission.
  -->
  <div class="contact">
    <!-- Page title -->
    <h1 class="contact__title">Contact Us</h1>
    <!-- Contact form -->
    <form class="contact__form" @submit.prevent="submitForm">
      <!-- Name field -->
      <div class="contact__field">
        <label for="name" class="contact__label">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="contact__input"
          required
          placeholder="Your name"
        />
      </div>
      <!-- Email field -->
      <div class="contact__field">
        <label for="email" class="contact__label">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="contact__input"
          required
          placeholder="example@email.com"
        />
      </div>
      <!-- Message field -->
      <div class="contact__field">
        <label for="message" class="contact__label">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          class="contact__textarea"
          required
          placeholder="How can we help you?"
        ></textarea>
      </div>
      <!-- Submit button -->
      <button class="contact__button" type="submit">Send Message</button>
      <!-- Success message -->
      <p v-if="submitted" class="contact__success">
        Thank you! We'll get back to you soon.
      </p>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: "ContactPage", // Name of the page component
  data() {
    return {
      // Form fields bound to the input elements
      form: {
        name: "",
        email: "",
        message: "",
      },
      submitted: false, // Controls display of the success message
    };
  },
  methods: {
    // Handle form submission
    submitForm() {
      // For demo, just show a success message and reset the form
      this.submitted = true;
      this.form = { name: "", email: "", message: "" };
      // Hide the success message after 4 seconds
      setTimeout(() => (this.submitted = false), 4000);
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  max-width: 800px; // Limit the width of the form
  margin: 2rem auto;
  padding: 0 1rem;

  &__title {
    text-align: center; // Center the page title
    margin-bottom: 2rem;
  }
  &__form {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  &__label {
    font-weight: 500;
    color: #343754;
  }
  &__input,
  &__textarea {
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-family: inherit;
    resize: none;
    transition: border 0.2s;
    &:focus {
      border-color: #343754;
      outline: none;
    }
  }
  &__textarea {
    min-height: 120px;
  }
  &__button {
    background: #343754;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    align-self: flex-end;
    transition: background 0.2s;
    &:hover {
      background: #545986;
    }
  }
  &__success {
    color: #088b17;
    margin-top: 1rem;
    text-align: right;
    font-size: 1rem;
  }
}
@media (max-width: 600px) {
  .contact__form {
    padding: 1rem;
  }
}
</style>
