import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.VITE_DEV_PORT ? parseInt(process.env.VITE_DEV_PORT) : 3001,
    host: true,
  },
});