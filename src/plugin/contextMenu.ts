import type HighlightrPlugin from "src/plugin/main";
import { Menu } from "obsidian";
import { HighlightrSettings } from "src/settings/settingsData";
import highlighterMenu from "src/ui/highlighterMenu";
import { EnhancedApp, EnhancedEditor } from "src/settings/types";

export default function contextMenu(
  app: EnhancedApp,
  menu: Menu,
  editor: EnhancedEditor,
  plugin: HighlightrPlugin,
  settings: HighlightrSettings
): void {
  const selection = editor.getSelection();

  menu.addItem((item) => {
    const itemDom = (item as any).dom as HTMLElement;
    itemDom.addClass("highlighter-button");
    item
      .setTitle("Highlight")
      .setIcon("highlightr-pen")
      .onClick(async (e) => {
        highlighterMenu(app, settings, editor);
      });
  });

  if (selection) {
    menu.addItem((item) => {
      item
        .setTitle("Erase highlight")
        .setIcon("highlightr-eraser")
        .onClick((e) => {
          if (editor.getSelection()) {
            plugin.eraseHighlight(editor);
          }
        });
    });
  }
}
