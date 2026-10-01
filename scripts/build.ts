#!/usr/bin/env node

/*
 * Copyright 2026 pyamsoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { build } from "esbuild";
import packageJson from "../package.json" with { type: "json" };

const scriptDir = dirname(new URL(import.meta.url).pathname);
const projectRootDir = dirname(scriptDir);
const srcDir = resolve(projectRootDir, "src");

const nodeNameToReadableName = function (s: string): string {
  return s
    .replace(/-/g, " ")
    .split(" ")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");
};

const esbuild = async function (srcDir: string, outDir: string) {
  await build({
    entryPoints: [resolve(srcDir, "main.ts")],
    outfile: resolve(outDir, "main.js"),
    bundle: true,
    minify: true,
    format: "esm",
    platform: "neutral",
    define: {
      __PACKAGE_NAME__: JSON.stringify(packageJson.name)
    }
  });
};

const generateMetadata = async function (outDir: string) {
  const metadata = {
    KPlugin: {
      Name: nodeNameToReadableName(packageJson.name),
      Icon: "preferences-system-windows",
      Id: packageJson.name,
      Version: packageJson.version,
      License: packageJson.license,
      Description: packageJson.description,
      Website: packageJson.homepage,
    },
    Authors: [
      {
        Email: packageJson.author.email,
        Name: packageJson.author.name,
      },
    ],
    "X-Plasma-API": "javascript",
    KPackageStructure: "KWin/Script",
  };

  await writeFile(
    resolve(outDir, "metadata.json"),
    JSON.stringify(metadata, null, 2) + "\n",
  );
};

const main = async function () {
  const distDir = resolve(projectRootDir, "dist", packageJson.name);
  const codeDir = resolve(distDir, "contents", "code");

  await mkdir(codeDir, { recursive: true });
  await esbuild(srcDir, codeDir);
  await generateMetadata(distDir);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
