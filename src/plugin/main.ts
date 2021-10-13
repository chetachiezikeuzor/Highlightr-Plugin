import { Editor, App, Menu, Plugin, MarkdownView } from "obsidian";
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
    this.registerEvent(
      this.app.workspace.on("editor-menu", this.handleHighlighterMenu)
    );
    this.addSettingTab(new HighlightrSettingTab(this.app, this));
    this.addCommand({
      id: "highlighter-plugin-menu",
      name: "Highlight",
      icon: "highlightpen",
      callback: async () => {
        !document.querySelector(".menu.highlighterContainer")
          ? highlighterMenu(this.app, this.instance, this, this.settings)
          : true;
      },
    });

    addEventListener("Highlightr-NewCommand", () => {
      this.generateCommands(this.instance);
    });
    this.generateCommands(this.instance);
  }

  generateCommands(editor: Editor) {
    this.settings.highlighters.forEach((highlighter: Highlighters) => {
      const applyCommand = (command: CommandPlot, editor: Editor) => {
        const selectedText = editor.getSelection();
        const curserStart = editor.getCursor("from");
        const curserEnd = editor.getCursor("to");
        const prefix = command.prefix;
        const suffix = command.suffix || prefix;
        const setCursor = (mode: number) => {
          editor.setCursor(
            curserStart.line + command.line * mode,
            curserEnd.ch + command.prefix.length * mode
          );
        };
        const preStart = {
          line: curserStart.line - command.line,
          ch: curserStart.ch - prefix.length,
        };
        const pre = editor.getRange(preStart, curserStart);

        if (pre === prefix.trimStart()) {
          const sufEnd = {
            line: curserStart.line + command.line,
            ch: curserEnd.ch + suffix.length,
          };
          const suf = editor.getRange(curserEnd, sufEnd);
          if (suf === suffix.trimEnd()) {
            editor.replaceRange(selectedText, preStart, sufEnd);
            return setCursor(-1);
          }
        }
        editor.replaceSelection(`${prefix}${selectedText}${suffix}`);

        return setCursor(1);
      };

      type CommandPlot = {
        char: number;
        line: number;
        prefix: string;
        suffix: string;
      };

      type commandsPlot = {
        [key: string]: CommandPlot;
      };

      const commandsMap: commandsPlot = {
        highlight: {
          char: 34,
          line: 0,
          prefix: '<mark style="background: ' + highlighter.value + `;">`,
          suffix: "</mark>",
        },
      };
      Object.keys(commandsMap).forEach((type) => {
        this.addCommand({
          id: `${highlighter.color}`,
          name: highlighter.color,
          icon: `highlightpen`,
          callback: async () => {
            const activeLeaf =
              this.app.workspace.getActiveViewOfType(MarkdownView);
            if (activeLeaf) {
              const view = activeLeaf;
              const editor = view.editor;
              applyCommand(commandsMap[type], editor);
              await wait(10);
              //@ts-ignore
              this.app.commands.executeCommandById("editor:focus");
            }
          },
        });
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
