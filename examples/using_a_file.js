import tinyplate from "tinyplate";
import fs from "fs";

const template = fs.readFileSync("template.txt", "utf8");
tinyplate(template, { name: "tinyplate" });
