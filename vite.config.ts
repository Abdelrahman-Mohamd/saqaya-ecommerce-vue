import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Build configuration for production
  build: {
    // Generate source maps only in development
    sourcemap: false,
    // Optimize build for production
    minify: "terser",
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Rollup options for better optimization
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          "vue-vendor": ["vue", "vue-router", "pinia"],
          "ui-vendor": ["@iconify/vue"],
        },
      },
    },
  },
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },
  // Development server configuration
  server: {
    port: 3000,
    host: true,
  },
});
