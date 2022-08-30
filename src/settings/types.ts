import { App, Editor, Menu } from "obsidian";

export interface Coords {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export type EnhancedMenu = Menu & { dom: HTMLElement };

export type EnhancedApp = App & {
  commands: { executeCommandById: Function };
};

export type EnhancedEditor = Editor & {
  cursorCoords: Function;
  coordsAtPos: Function;
  cm: CodeMirror.Editor & { coordsAtPos: Function };
  hasFocus: Function;
  getSelection: Function;
};
