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

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { build } from "esbuild";

const scriptDir = dirname(new URL(import.meta.url).pathname);
const projectRootDir = dirname(scriptDir);
const srcDir = resolve(projectRootDir, "src");

interface PackageJson {
  name: string;
  version: string;
  description: string;
  author: {
    email: string;
    name: string;
  };
  license: string;
  homepage: string;
}

const readPackageJson = async function (): Promise<PackageJson> {
  const packageJsonFile = await readFile(
    resolve(projectRootDir, "package.json"),
    "utf-8",
  );
  return JSON.parse(packageJsonFile);
};

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
  });
};

const generateMetadata = async function (pkg: PackageJson, outDir: string) {
  const metadata = {
    KPlugin: {
      Name: nodeNameToReadableName(pkg.name),
      Icon: "preferences-system-windows",
      Id: pkg.name,
      Version: pkg.version,
      License: pkg.license,
      Description: pkg.description,
      Website: pkg.homepage,
    },
    Authors: [
      {
        Email: pkg.author.email,
        Name: pkg.author.name,
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
  const pkg = await readPackageJson();

  const distDir = resolve(projectRootDir, "dist", pkg.name);
  const codeDir = resolve(distDir, "contents", "code");

  await mkdir(codeDir, { recursive: true });
  await esbuild(srcDir, codeDir);
  await generateMetadata(pkg, distDir);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
