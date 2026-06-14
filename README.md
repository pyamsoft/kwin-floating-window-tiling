# KWin Floating Window Tiling

## What

KWin6 tiles windows using an actual "tiling" algorithm, meaning windows "snap" into place and move as a combined "unit"
While many people like this, I do not.

This script seeks to re-implement the basic "floating window" tiling behavior seen by the GNOME extension
`Tiling Assistant`, which is based on the original GNOME 2 style.

## Install

### npm vs pnpm

As a note, I prefer `pnpm` over `npm`, but the project SHOULD build with both.

```bash
$ npm run build # build the project
$ ./bin/installer # install the built files from "dist" into the expected location
$ qdbus6 org.kde.KWin /KWin reconfigure # reload KWin
```

## License

Apache 2

```
Copyright 2026 pyamsoft

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
