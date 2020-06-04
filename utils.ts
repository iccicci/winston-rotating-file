"use strict";

import { unlink, writeFile } from "fs";

const common: string[] = ["*.log", "*.tgz", ".gitignore", ".npmignore", ".nyc_output", "coverage", "node_modules", "notes.txt", ""];
const git: string[] = ["index.js"];
const npm: string[] = [".*", "index.ts", "test", "tsconfig.json", "utils.ts"];

if(process.argv[2] === "clean") unlink("index.js", (): void => {});
if(process.argv[2] === "ignore") writeFile(".gitignore", git.concat(common).join("\n"), (): void => writeFile(".npmignore", npm.concat(common).join("\n"), (): void => {}));
