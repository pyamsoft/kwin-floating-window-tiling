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

import { name as packageName } from "../package.json";

const forcePlaceWindow = function (props: {
  xScale: number;
  yScale: number;
  widthScale: number;
  heightScale: number;
}) {
  const win = workspace.activeWindow;

  // No window, bail
  if (!win) {
    return;
  }

  // Window is special, bail
  if (win.specialWindow) {
    return;
  }

  // Window is fullscreen, bail
  if (win.fullScreen) {
    return;
  }

  // Grab full usable area
  const screen = workspace.clientArea(KWin.WorkArea, win);
  if (!screen) {
    return;
  }

  // Commit new geometry
  const { xScale, yScale, widthScale, heightScale } = props;
  win.frameGeometry = {
    x: screen.x + Math.round(screen.width * xScale),
    y: screen.y + Math.round(screen.height * yScale),
    width: Math.round(screen.width * widthScale),
    height: Math.round(screen.height * heightScale),
  };
};

const makeShortcutId = function (id: string): string {
  return `pyamsoft-${packageName}-${id}`;
};

const registerShorcutsScreenHalves = function () {
  registerShortcut(
    makeShortcutId("left-half"),
    "Quick Tile Floating Window to the Left",
    "Meta+Left",
    () =>
      forcePlaceWindow({
        xScale: 0,
        yScale: 0,
        widthScale: 0.5,
        heightScale: 1,
      }),
  );

  registerShortcut(
    makeShortcutId("right-half"),
    "Quick Tile Floating Window to the Right",
    "Meta+Right",
    () =>
      forcePlaceWindow({
        xScale: 0.5,
        yScale: 0,
        widthScale: 0.5,
        heightScale: 1,
      }),
  );

  registerShortcut(
    makeShortcutId("top-half"),
    "Quick Tile Floating Window to the Top",
    "Meta+Up",
    () =>
      forcePlaceWindow({
        xScale: 0,
        yScale: 0,
        widthScale: 1,
        heightScale: 0.5,
      }),
  );

  registerShortcut(
    makeShortcutId("bottom-half"),
    "Quick Tile Floating Window to the Bottom",
    "Meta+Down",
    () =>
      forcePlaceWindow({
        xScale: 0,
        yScale: 0.5,
        widthScale: 1,
        heightScale: 0.5,
      }),
  );
};

const registerShorcutsScreenQuadrants = function () {
  registerShortcut(
    makeShortcutId("bottom-left-quadrant"),
    "Quick Tile Floating Window to the Bottom Left",
    "Meta+;",
    () =>
      forcePlaceWindow({
        xScale: 0,
        yScale: 0.5,
        widthScale: 0.5,
        heightScale: 0.5,
      }),
  );

  registerShortcut(
    makeShortcutId("bottom-right-quadrant"),
    "Quick Tile Floating Window to the Bottom Right",
    "Meta+'",
    () =>
      forcePlaceWindow({
        xScale: 0.5,
        yScale: 0.5,
        widthScale: 0.5,
        heightScale: 0.5,
      }),
  );

  registerShortcut(
    makeShortcutId("top-left-quadrant"),
    "Quick Tile Floating Window to the Top Left",
    "Meta+[",
    () =>
      forcePlaceWindow({
        xScale: 0,
        yScale: 0,
        widthScale: 0.5,
        heightScale: 0.5,
      }),
  );

  registerShortcut(
    makeShortcutId("top-right-quadrant"),
    "Quick Tile Floating Window to the Top Right",
    "Meta+]",
    () =>
      forcePlaceWindow({
        xScale: 0.5,
        yScale: 0,
        widthScale: 0.5,
        heightScale: 0.5,
      }),
  );
};

(() => {
  registerShorcutsScreenHalves();
  registerShorcutsScreenQuadrants();
})();
