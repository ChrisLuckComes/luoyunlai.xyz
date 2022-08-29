export const VITE_CONFIG = `import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "build"
  },
  plugins: [tsConfigPaths()]
});
`;
