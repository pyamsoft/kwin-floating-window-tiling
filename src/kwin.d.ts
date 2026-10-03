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
 * Client area option, e.g. KWin.WorkArea
 */
export type KWinClientAreaOption = number;

/**
 * KWin Workspace
 */
export interface KWinWorkspace {
  /**
   * Get active window
   */
  activeWindow: KWinWorkspaceWindow | null;

  /**
   * Resolve client area
   */
  clientArea: (
    area: KWinClientAreaOption,
    window: KWinWorkspaceWindow,
  ) => KWinFrameGeometry;
}

/**
 * KWin enums
 */
export interface KWin {
  WorkArea: KWinClientAreaOption;
}

declare global {
  /**
   * Global KDE Workspace
   */
  export const workspace: KWinWorkspace;

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
