import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/drawings/" : "/",
  server: {
    port: 8321,
  },
}));
