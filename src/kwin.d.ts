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

/**
 * Geometry
 */
export interface KWinFrameGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Screen representation
 */
export interface KWinWorkspaceWindowOutput {
  /**
   * Geometry
   */
  geometry: KWinFrameGeometry;
}

export interface KWinWorkspaceWindow {
  /**
   * Frame geometry
   */
  frameGeometry: KWinFrameGeometry;

  /**
   * Is a special window
   */
  specialWindow: boolean;

  /**
   * Is fullscreen
   */
  fullScreen: boolean;
}

/**
 * KWin Workspace
 */
export interface KWinWorkspace {
  /**
   * Get active window
   */
  activeWindow: KWinWorkspaceWindow | undefined;

  /**
   * Resolve client area
   */
  clientArea: (
    area: keyof KWin,
    window: KWinWorkspaceWindow,
  ) => KWinFrameGeometry;
}

declare namespace KWin {
  const WorkArea: unknown;
}

declare global {
  /**
   * Global KDE Workspace
   */
  export const workspace: KwinWorkspace;

  /**
   * Register global keyboard shortcut
   */
  export const registerShortcut: (
    id: string,
    name: string,
    shortcut: string,
    onShortcutAction: () => void,
  ) => void;

  export const KWin: KWin;
}
