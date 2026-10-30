import * as sass from "sass";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(resolve(__dirname, "../package.json"));

const carbonReactPkg = require.resolve("@carbon/react/package.json");
const carbonReactNM = resolve(dirname(carbonReactPkg), "../..");

const carbonStylesReq = createRequire(carbonReactPkg);
const carbonStylesPkg = carbonStylesReq.resolve("@carbon/styles/package.json");
const carbonStylesNM = resolve(dirname(carbonStylesPkg), "../..");

const result = sass.compile(resolve(__dirname, "carbon-iframe.scss"), {
  loadPaths: [carbonReactNM, carbonStylesNM],
  style: "compressed",
  sourceMap: false,
  silenceDeprecations: ["if-function"],
});

const outPath = resolve(__dirname, "../static/carbon-iframe.css");
writeFileSync(outPath, result.css);
console.log(
  `Carbon CSS compiled to static/carbon-iframe.css (${result.css.length} bytes)`
);
