import { terser } from "rollup-plugin-terser";

export default {
  input: "src/toastify-pro.js",
  output: [
    {
      file: "dist/toastify-pro.umd.js",
      format: "umd",
      name: "ToastifyPro"
    },
    {
      file: "dist/toastify-pro.umd.min.js",
      format: "umd",
      name: "ToastifyPro",
      plugins: [terser()]
    },
    {
      file: "dist/toastify-pro.esm.js",
      format: "es"
    }
  ]
};
