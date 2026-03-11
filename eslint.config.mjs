import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        // Variables: camelCase or UPPER_CASE for constants
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
        // Functions: camelCase (or PascalCase for React components)
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        // Types, interfaces, enums: PascalCase
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        // Parameters: camelCase with leading underscore allowed
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
      ],
    },
  },
];

export default eslintConfig;
