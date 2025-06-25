<template>
  <select
    name="sort"
    id="sort-select"
    @change="onSortChange"
    v-model="selectedSort"
  >
    <option value="" disabled selected>Sort by</option>
    <option value="price-low-high">Price: Low to High</option>
    <option value="price-high-low">Price: High to Low</option>
    <option value="rating-low-high">Rating: Low to High</option>
    <option value="rating-high-low">Rating: High to Low</option>
  </select>
</template>

<script lang="ts">
export default {
  name: "SortDropdown", // Name of the component
  data() {
    return {
      selectedSort: "price-low-high", // Default sort option
    };
  },
  methods: {
    // Handle sort change
    onSortChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.selectedSort = target.value;
      this.$emit("sort-changed", this.selectedSort); // Emit event to parent
    },
  },
};
</script>

<style scoped>
#sort-select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;
}
</style>
