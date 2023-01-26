#!/usr/bin/env node

import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { readdirSync, unlink } from "fs";
import path from "path";
import url from "url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const outdir = path.join(dirname, "../docs");
const deletes = [];

readdirSync(outdir).forEach((filepath) => {
  if (filepath.match(/\.(css|js)(\.map)?$/)) {
    deletes.push(new Promise((resolve, reject) => {
      unlink(path.join(outdir, filepath), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    }));
  }
});

Promise.all(deletes).then(() => {
  esbuild.build({
    bundle: true,
    entryPoints: [path.join(dirname, "../src/index.tsx")],
    format: "esm",
    minify: true,
    outdir,
    plugins: [cssModulesPlugin()],
    sourcemap: true,
    splitting: true,
    target: "es6"
  });
});
