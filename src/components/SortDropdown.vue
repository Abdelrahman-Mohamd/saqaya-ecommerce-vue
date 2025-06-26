<template>
  <select class="sort-dropdown" v-model="selectedSort" @change="onSortChange">
    <option value="" disabled>Sort by</option>
    <option value="price-low-high">Price: Low to High</option>
    <option value="price-high-low">Price: High to Low</option>
    <option value="rating-low-high">Rating: Low to High</option>
    <option value="rating-high-low">Rating: High to Low</option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SortDropdown",

  data() {
    return {
      selectedSort: "", // Current selected sort option
    };
  },

  methods: {
    // Emit the sort change event to parent component
    onSortChange() {
      this.$emit("sort-changed", this.selectedSort);
    },
  },

  // Define emitted events for TypeScript
  emits: ["sort-changed"],
});
</script>

<style lang="scss" scoped>
.sort-dropdown {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  option {
    padding: 0.5rem;
  }
}
</style>
