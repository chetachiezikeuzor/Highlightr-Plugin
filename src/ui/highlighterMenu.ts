import type HighlightrPlugin from "src/plugin/main";
import { App, Menu, Notice, Editor } from "obsidian";
import { HighlightrSettings } from "src/settings/settingsData";
import { Coords } from "src/settings/types";

const highlighterMenu = (
  app: App,
  plugin: HighlightrPlugin,
  settings: HighlightrSettings,
  editor: Editor
): void => {
  if (editor && editor.hasFocus()) {
    const cursor = editor.getCursor("from");
    let coords: Coords;
    const editorCli = editor as any;

    const menu = new Menu(plugin.app);

    const menuDom = (menu as any).dom as HTMLElement;
    menuDom.addClass("highlighterContainer");

    settings.highlighterOrder.forEach((highlighter) => {
      menu.addItem((highlighterItem) => {
        highlighterItem.setTitle(highlighter);
        highlighterItem.setIcon(`highlightr-pen-${highlighter}`.toLowerCase());
        highlighterItem.onClick(() => {
          (app as any).commands.executeCommandById(
            `highlightr-plugin:${highlighter}`
          );
        });
      });
    });

    if (editorCli.cursorCoords) {
      coords = editorCli.cursorCoords(true, "window");
    } else if (editorCli.coordsAtPos) {
      const offset = editor.posToOffset(cursor);
      coords =
        editorCli.cm.coordsAtPos?.(offset) ?? editorCli.coordsAtPos(offset);
    } else {
      return;
    }

    menu.showAtPosition({
      x: coords.right + 25,
      y: coords.top + 20,
    });
  } else {
    new Notice("Focus must be in editor");
  }
};

export default highlighterMenu;
