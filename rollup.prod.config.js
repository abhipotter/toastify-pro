import terser from "@rollup/plugin-terser";

export default {
  input: "src/toastify-pro.js",
  output: [
    // Production UMD build - CDN optimized
    {
      file: "dist/toastify-pro.umd.min.js",
      format: "umd",
      name: "ToastifyPro",
      plugins: [terser({
        compress: {
          drop_console: false, // Keep console warnings for debugging
          drop_debugger: true,
          pure_funcs: ['console.log'], // Remove console.log only
        },
        format: {
          comments: /^!|@preserve|@license|@cc_on/i, // Keep license comments
        }
      })],
      sourcemap: false, // No source maps for production
    },
    // ES Module build
    {
      file: "dist/toastify-pro.esm.js",
      format: "es",
      sourcemap: false, // No source maps for production
    }
  ]
};