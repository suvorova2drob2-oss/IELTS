import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  // useRecommendedBuildConfig плагина насильно зашивает вообще все файлы (assetsInlineLimit = () => true),
  // игнорируя build.assetsInlineLimit ниже. Отключаем и настраиваем сами: JS/CSS зашиваются в index.html,
  // а картинки остаются рядом отдельными файлами — параллельная загрузка и кэш в браузере.
  plugins: [react(), viteSingleFile({ useRecommendedBuildConfig: false })],
  base: "./",
  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    assetsDir: "",
    chunkSizeWarningLimit: 100_000_000,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
