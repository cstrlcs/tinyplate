import config from "@cstrlcs/configs/oxfmt/base.js";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...config,
  ignorePatterns: ["README.md", "package.json"],
  sortImports: { newlinesBetween: false },
});
