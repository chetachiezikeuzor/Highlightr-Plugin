import type { App, Editor } from "obsidian";
import type HighlightrPlugin from "src/plugin/main";
import { Menu } from "obsidian";
import { HighlightrSettings } from "src/settings/settingsData";
import highlighterMenu from "src/ui/highlighterMenu";

export default function contextMenu(
  app: App,
  menu: Menu,
  instance: Editor,
  plugin: HighlightrPlugin,
  settings: HighlightrSettings
): void {
  const selection = instance.getSelection();

  if (selection) {
    menu.addItem((item) => {
      const itemDom = (item as any).dom as HTMLElement;
      itemDom.addClass("highlighter-button");
      item
        .setTitle("Highlight")
        .setIcon("highlightpen")
        .onClick(async (_) => {
          highlighterMenu(app, instance, plugin, settings);
        });
    });
    menu.addItem((item) => {
      item
        .setTitle("Unhighlight")
        .setIcon("eraser")
        .onClick((e) => {
          if (instance.getSelection()) {
            const currentStr = instance.getSelection();
            const newStr = currentStr.replace(/\<.*?[^\>]\>/g, "");
            instance.replaceSelection(newStr);
            //@ts-ignore
            app.commands.executeCommandById("editor:focus");
          }
        });
    });
  }
}
