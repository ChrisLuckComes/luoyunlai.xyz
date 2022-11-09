export const ROLLUP = `\`\`\`ts
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "./src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      entryFileNames: "[name].js",
    },
    plugins: [resolve(), commonjs(), typescript()],
  },
  {
    input: "./src/index.ts",
    output: {
      dir: "dist",
      format: "esm",
      entryFileNames: "[name].esm.js",
    },
    plugins: [resolve(), commonjs(), typescript()],
  },
];
\`\`\``;

export const ROLLUP_SCRIPTS = `\`\`\`json
"dev": "rollup -w -c",
"build": "rollup -c"
\`\`\``;

export const PACKAGE_JSON = `\`\`\`json
{
  "name": "dayjs-date-tools",
  "version": "1.0.7-alpha",
  "description": "基于dayjs的时间工具函数",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "rollup -w -c",
    "cypress:open": "cypress open",
    "build": "rollup -c"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/ChrisLuckComes/dayjs-date-tools.git"
  },
  "keywords": [
    "dayjs",
    "date",
    "rollup",
    "typescript"
  ],
  "author": "ChrisLuckComes",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/ChrisLuckComes/dayjs-date-tools/issues"
  },
  "homepage": "https://github.com/ChrisLuckComes/dayjs-date-tools#readme",
  "dependencies": {
    "dayjs": "^1.10.8"
  },
  "devDependencies": {
    "typescript": "^4.6.2",
    "@rollup/plugin-commonjs": "^21.0.2",
    "@rollup/plugin-node-resolve": "^13.1.3",
    "@rollup/plugin-typescript": "^8.3.1",
    "@typescript-eslint/eslint-plugin": "^5.14.0",
    "@typescript-eslint/parser": "^5.14.0",
    "cypress": "^9.5.1",
    "eslint": "^8.11.0",
    "prettier": "^2.5.1",
    "rollup": "^2.70.0"
  }
}
\`\`\``;

export const TS_CONFIG = `\`\`\`json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */
    /* Basic Options */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
    "module": "esnext" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    "lib": ["es5", "dom"] /* Specify library files to be included in the compilation. */,
    "declaration": true /* Generates corresponding '.d.ts' file. */,
    "outDir": "dist" /* Redirect output structure to the directory. */,
    "baseUrl": "." /* Base directory to resolve non-absolute module names. */,
    "paths": {
      "@/*": ["src/*"]
    } /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. */,
    "types": ["cypress"] /* Type declaration files to be included in compilation. */,
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    /* Advanced Options */
    "skipLibCheck": true /* Skip type checking of declaration files. */,
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  },
  "include": ["src/", "cypress/"],
}
\`\`\``;

export const INDEX = `\`\`\`ts
import {
  getFirstDayAndEndDayOfWeek,
  getFirstDayAndEndDayOfMonth,
  isInRange,
} from "./range/range";

import { isSameOrAfter, isSameOrBefore } from "./tool/tool";

import { Dayjs } from "dayjs";

export type DateParam = string | Date | Dayjs;

export {
  getFirstDayAndEndDayOfWeek,
  getFirstDayAndEndDayOfMonth,
  isInRange,
  isSameOrBefore,
  isSameOrAfter,
}
\`\`\``;

export const GITIGNORE = `/node_modules/
/dist/`;

export const NPMIGNORE = `node_modules/
src/
.babelrc
.gitignore
.npmignore
cypress/
pnpm-lock.yaml
cypress.json
tsconfig.json`;

export const INDEX_CSS = `\`\`\`css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\``;

export const POSTCSS = `\`\`\`js
// postcss.config.js
const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    require("tailwindcss/nesting"),
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
    require("postcss-pxtorem"),
    require("postcss-preset-env"),
    require("postcss-nested"),
    require("postcss-apply")
  ],
}
\`\`\``;

export const TAILWIND = `\`\`\`js
// tailwind.config.js
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {},
  plugins: [],
};\`\`\``;

export const SCRIPTS = `\`\`\`json
"scripts":{
  "start:css": "tailwindcss -o src/styles/tailwind.css --watch",
  "start": "concurrently \"npm run start:css\" \"node scripts/start.js\"",
}
\`\`\``;

export const HTML = `\`\`\`js
const classMap = {
  layout: "h-content",
  content: "h-full pl-content bg-white overflow-y-auto",
  sider: "bg-white",
};

return (
  <Layout className={classMap.layout}>
    <Sider className={classMap.sider}>
    </Sider>
    <Content className={classMap.content}></Content>
  </Layout>
);
\`\`\``;
