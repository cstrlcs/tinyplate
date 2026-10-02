import fs from "node:fs";
import interpolate from "@cstrlcs/interpolate";

const template = fs.readFileSync("template.txt", "utf8");
interpolate(template, { name: "interpolate" });
