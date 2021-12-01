import type { App, Editor } from "obsidian";
import type HighlightrPlugin from "src/plugin/main";
import { Menu } from "obsidian";
import { HighlightrSettings } from "src/settings/settingsData";
import highlighterMenu from "src/ui/highlighterMenu";

export default function contextMenu(
  app: App,
  menu: Menu,
  editor: Editor,
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
      .onClick(async (_) => {
        highlighterMenu(app, plugin, settings, editor);
      });
  });
  if (selection) {
    menu.addItem((item) => {
      item
        .setTitle("Unhighlight")
        .setIcon("highlightr-eraser")
        .onClick((e) => {
          if (editor.getSelection()) {
            plugin.eraseHighlight(editor);
          }
        });
    });
  }
}
