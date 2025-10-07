import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isLib = mode === "lib-individual";

  if (isLib) {
    return {
      plugins: [
        react(),
        dts({
          include: ["src/components/**/*", "src/lib/**/*", "src/types/**/*"],
          exclude: [
            "src/**/tests/**/*",
            "src/**/*.test.*",
            "src/**/*.spec.*",
            "src/**/*.html",
          ],
          outDir: "dist",
        }),
      ],
      resolve: {
        alias: {
          "~": resolve(__dirname, "./"),
        },
      },
      build: {
        outDir: "dist",
        lib: {
          entry: {
            index: resolve(__dirname, "src/lib/index.ts"),
            Button: resolve(__dirname, "src/lib/Button.ts"),
            TextField: resolve(__dirname, "src/lib/TextField.ts"),
          },
          name: "ReactComponents",
          fileName: (format, entryName) => `${entryName}.js`,
          formats: ["es"],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === "style.css") return "style.css";
              return assetInfo.name || "assets/[name][extname]";
            },
          },
        },
        cssCodeSplit: false,
        sourcemap: true,
        minify: false,
        emptyOutDir: true,
      },
    };
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "~": resolve(__dirname, "./"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          button: resolve(__dirname, "./src/views/Button/example.html"),
          textfield: resolve(__dirname, "./src/views/TextField/example.html"),
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./testSetup/setup.ts"],
    },
  };
});
