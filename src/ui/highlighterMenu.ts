import type HighlightrPlugin from "src/plugin/main";
import { App, Menu, Notice, Editor } from "obsidian";
import { HighlightrSettings } from "src/settings/settingsData";
import { Coords } from "src/settings/types";

const highlighterMenu = (
  app: App,
  plugin: HighlightrPlugin,
  settings: HighlightrSettings,
  editor: Editor,
  event?: MouseEvent
): void => {
  if (editor && editor.hasFocus()) {
    const cursor = editor.getCursor("from");
    let coords: Coords;
    const editorCli = editor as any;

    const menu = new Menu(plugin.app).addItem((item) => {
      const itemDom = (item as any).dom as HTMLElement;
      itemDom.setAttribute("style", "display: none");
    });

    const menuDom = (menu as any).dom as HTMLElement;
    menuDom.addClass("highlighterContainer");

    settings.highlighterOrder.forEach((highlighter) => {
      const colorButton = menuDom.createEl("div");
      colorButton.setAttribute("id", `${highlighter}`);

      colorButton.addEventListener("click", function (event) {
        (app as any).commands.executeCommandById(
          `highlightr-plugin:${highlighter}`
        );
      });

      const colorButtonIcon = colorButton.createEl("span");
      colorButtonIcon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.15em" height="1.15em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><title>' +
        highlighter +
        '</title><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10a5 5 0 0 1 0 10z"/></svg>';
      colorButtonIcon.setAttribute(
        "style",
        "margin-right: 10px; vertical-align: -.15em; display: inline-flex;"
      );
      colorButtonIcon.style.fill = settings.highlighters[highlighter];

      const colorButtonText = colorButton.createEl("span");
      colorButtonText.innerHTML = highlighter;
      colorButtonText.setAttribute("style", "font-weight: 400;");
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
