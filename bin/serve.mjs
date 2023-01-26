#!/usr/bin/env node

import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import path from "path";
import url from "url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const serveOptions = {
  servedir: path.join(dirname, "../docs")
};

const buildOptions = {
  bundle: true,
  entryPoints: [path.join(dirname, "../src/index.tsx")],
  format: "esm",
  outdir: serveOptions.servedir,
  plugins: [cssModulesPlugin()],
  sourcemap: true,
  splitting: true,
  target: "esnext"
};

const context = await esbuild.context(buildOptions);
const { host, port } = await context.serve(serveOptions);
console.log(`Listening at ${host}:${port}`);
