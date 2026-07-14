import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves this repo at /contribution-report-2026/, and the
// build output lands directly in docs/ so Pages (main branch, /docs) picks
// it up with no separate deploy step.
export default defineConfig({
  base: "/contribution-report-2026/",
  plugins: [react()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
