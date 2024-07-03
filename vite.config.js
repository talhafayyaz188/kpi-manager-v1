// vite.config.ts
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
});
