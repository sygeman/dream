import { dirname } from "path";
import { fileURLToPath } from "url";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  languageOptions: {
    globals: globals.builtin,
  },
  plugins: {
    perfectionist,
    unicorn: eslintPluginUnicorn,
  },
  rules: {
    "perfectionist/sort-imports": "error",
    "unicorn/no-keyword-prefix": "off",
    "unicorn/no-null": "off",
  },
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
