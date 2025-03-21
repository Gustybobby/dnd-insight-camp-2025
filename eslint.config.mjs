import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
    plugins: ["simple-import-sort"],
    parser: "@typescript-eslint/parser",
    parserOptions: { project: "./tsconfig.json" },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            //type imports
            ["\\u0000$"],
            //anything else
            ["^"],
          ],
        },
      ],
    },
  }),
];

export default eslintConfig;
