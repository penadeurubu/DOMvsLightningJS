import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import legacy from "@vitejs/plugin-legacy";
import devtools from "solid-devtools/vite";
import hexColorTransform from "@lightningtv/vite-hex-transform";
import path from "path";

export default defineConfig(({ mode }) => ({
  define: {
    __DEV__: mode !== "production"
  },
  plugins: [
    hexColorTransform({
      include: ["src/**/*.{ts,tsx,js,jsx}"]
    }),
    devtools({
      /* features options - all disabled by default */
      autoname: true,
      locator: {
        jsxLocation: true,
        componentLocation: true,
        targetIDE: "vscode"
      }
    }),
    solidPlugin({
      solid: {
        moduleName: "@lightningtv/solid",
        generate: "universal",
        builtIns: []
      }
    })
  ],
  build: {
    targets: ["chrome>=100"],
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: [],
        passes: 1
      },
      mangle: {
        // Não fazer mangle de propriedades para evitar quebrar o Lightning
        properties: false,
        keep_classnames: true,
        keep_fnames: true
      }
    },
    sourcemap: false,
    rollupOptions: {
      output: {
        // Mantém nomes de funções e classes
        preserveModules: false,
        // Evita minificação agressiva
        compact: false
      }
    }
  },
  resolve: {
    alias: {
      theme: path.resolve(__dirname, "src/theme.ts")
    },
    conditions: ["@lightningtv/source"],
    dedupe: [
      "solid-js",
      "solid-js/universal",
      "@solidjs/router",
      "@lightningjs/renderer",
      "@lightningtv/core",
      "@lightningtv/solid",
      "@lightningtv/solid/primitives"
    ]
  },
  optimizeDeps: {
    exclude: [
      "@lightningtv/solid",
      "@lightningtv/core",
      "@lightningjs/renderer"
    ]
  },
  server: {
    port: 5174,
    hmr: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }  
}));
