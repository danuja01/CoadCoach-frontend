import react from "@vitejs/plugin-react";
import { default as path } from "path";
import { defineConfig, loadEnv } from "vite";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    base: "./",
    resolve: {
      alias: {
        "@/": `${path.resolve(__dirname, "src")}/`
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis"
        }
      }
    }
  });
};
