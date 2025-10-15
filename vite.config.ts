import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_DEV_PORT ? parseInt(process.env.VITE_DEV_PORT) : 3001,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'refine-vendor': ['@refinedev/core', '@refinedev/react-table'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});