import type HighlightrPlugin from "src/plugin/main";
import { App, Menu, MarkdownView } from "obsidian";
import { HighlightrSettings } from "src/settings/settingsData";

export default function highlighterMenu(
  app: App,
  plugin: HighlightrPlugin,
  settings: HighlightrSettings
) {
  const activeView = app.workspace.getActiveViewOfType(MarkdownView);

  if (activeView && activeView.editor.hasFocus()) {
    const selection = document.getSelection();
    const selectionContainer = selection.getRangeAt(0)
      .commonAncestorContainer as HTMLElement;
    const selectionRect = selectionContainer.getClientRects()[0];
    const menu = new Menu(plugin.app).addItem((item) => {
      const itemDom = (item as any).dom as HTMLElement;
      itemDom.setAttribute("style", "display: none");
    });

    const menuDom = (menu as any).dom as HTMLElement;
    menuDom.addClass("highlighterContainer");

    settings.highlighters.forEach((highlighter) => {
      const colorButton = menuDom.createEl("div");
      colorButton.setAttribute("id", `${highlighter.color}`);

      colorButton.addEventListener("click", function (event) {
        //@ts-ignore
        app.commands.executeCommandById(
          `highlightr-plugin:${highlighter.color}`
        );
      });

      const colorButtonIcon = colorButton.createEl("span");
      colorButtonIcon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.15em" height="1.15em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><title>' +
        highlighter.color +
        '</title><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10a5 5 0 0 1 0 10z"/></svg>';
      colorButtonIcon.setAttribute(
        "style",
        "margin-right: 10px; vertical-align: -.15em; display: inline-flex;"
      );
      colorButtonIcon.style.fill = highlighter.value;

      const colorButtonText = colorButton.createEl("span");
      colorButtonText.innerHTML = highlighter.color;
      colorButtonText.setAttribute("style", "font-weight: 400;");
    });

    menu.showAtPosition({
      x: selectionRect.right + 5,
      y: selectionRect.top + 15,
    });
  } else {
    return;
  }
}
