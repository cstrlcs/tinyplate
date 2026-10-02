import config from "@cstrlcs/configs/oxlint/base.js";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...config,
  rules: {
    ...config.rules,
    "cstrlcs/no-explicit-return-type": "off",
    "cstrlcs/padding-between-statements": "off",
    "eslint/func-names": "off",
    "eslint/func-style": "off",
    "eslint/max-params": "off",
    "eslint/no-new-func": "off",
    "eslint/no-restricted-imports": "off",
    "eslint/prefer-named-capture-group": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-nodejs-modules": "off",
    "import/no-relative-parent-imports": "off",
    "typescript/no-base-to-string": "off",
    "typescript/no-implied-eval": "off",
    "typescript/no-unsafe-assignment": "off",
    "typescript/no-unsafe-call": "off",
    "typescript/no-unsafe-return": "off",
    "typescript/restrict-template-expressions": "off",
    "typescript/strict-boolean-expressions": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-anonymous-default-export": "off",
    "unicorn/no-await-expression-member": "off",
    "unicorn/prefer-code-point": "off",
    "unicorn/prefer-string-replace-all": "off",
  },
  overrides: [
    ...(config.overrides ?? []),
    {
      files: ["**/*.test.ts"],
      rules: { "eslint/no-restricted-imports": "off" },
    },
  ],
});
