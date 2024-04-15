import fs from "node:fs";
import tinyplate from "tinyplate.js";

const template = fs.readFileSync("template.txt", "utf8");
tinyplate(template, { name: "tinyplate" });
