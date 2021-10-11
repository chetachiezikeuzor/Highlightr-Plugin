import {
  Editor,
  App,
  PluginManifest,
  WorkspaceLeaf,
  Menu,
  PluginSettingTab,
  Plugin,
  MarkdownView,
} from "obsidian";

import { wait } from "src/util/util";

import { Highlighters } from "../settings/settingsData";

import addIcons from "src/icons/customIcons";

import { HighlightrSettingTab } from "../settings/settingsTab";
import { HighlightrSettings } from "../settings/settingsData";

import { DEFAULT_SETTINGS } from "../settings/settingsData";

import contextMenu from "src/plugin/contextMenu";
import highlighterMenu from "src/ui/highlighterMenu";

import "@simonwep/pickr/dist/themes/nano.min.css";
//import "src/pickerOverrides.css";
//import "src/settings.css";

export default class HighlightrPlugin extends Plugin {
  app: App;
  instance: Editor;
  settings: HighlightrSettings;

  async onload() {
    console.log("Highlightr v" + this.manifest.version + " loaded");
    addIcons();
    await this.loadSettings();
    // @ts-ignore
    this.registerEvent(
      // @ts-ignore
      this.app.workspace.on("editor-menu", this.handleHighlighterMenu)
    );
    this.addSettingTab(new HighlightrSettingTab(this.app, this));
    this.addCommand({
      id: "highlighter-plugin-menu",
      name: "Highlight",
      icon: "highlightpen",
      callback: async () => {
        highlighterMenu(this.app, this.instance, this, this.settings);
      },
    });
    this.generateCommands(this.instance);
  }

  generateCommands(editor: Editor) {
    this.settings.highlighters.forEach((highlighter: Highlighters) => {
      this.addCommand({
        id: `${highlighter.color}`,
        name: highlighter.color,
        icon: `highlightpen`,
        callback: async () => {
          const activeLeaf =
            this.app.workspace.getActiveViewOfType(MarkdownView);
          const view = activeLeaf;
          const editor = view.editor;
          const colorTranslucency = "A6";
          //@ts-ignore
          if (editor.getSelection()) {
            const currentStr = editor.getSelection();
            editor.replaceSelection(
              '<mark style="background: ' +
                highlighter.value +
                colorTranslucency +
                ';">' +
                currentStr +
                "</mark>"
            );
          }
          editor.setCursor(editor.getCursor("to"));
          await wait(10);
          //@ts-ignore
          this.app.commands.executeCommandById("editor:focus");
        },
      });
    });
  }

  onunload() {
    console.log("Highlightr unloaded");
  }

  handleHighlighterMenu = (menu: Menu, editor: Editor): void => {
    contextMenu(this.app, menu, editor, this, this.settings);
  };

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
