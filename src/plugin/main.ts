import { Editor, Menu, Plugin, PluginManifest } from "obsidian";
import { wait } from "src/utils/util";
import addIcons from "src/icons/customIcons";
import { HighlightrSettingTab } from "../settings/settingsTab";
import { HighlightrSettings } from "../settings/settingsData";
import DEFAULT_SETTINGS from "../settings/settingsData";
import contextMenu from "src/plugin/contextMenu";
import highlighterMenu from "src/ui/highlighterMenu";
import { createHighlighterIcons } from "src/icons/customIcons";

import { createStyles } from "src/utils/createStyles";
import { EnhancedApp, EnhancedEditor } from "src/settings/types";

export default class HighlightrPlugin extends Plugin {
  app: EnhancedApp;
  editor: EnhancedEditor;
  manifest: PluginManifest;
  settings: HighlightrSettings;

  async onload() {
    console.log(`Highlightr v${this.manifest.version} loaded`);
    addIcons();

    await this.loadSettings();

    this.app.workspace.onLayoutReady(() => {
      this.reloadStyles(this.settings);
      createHighlighterIcons(this.settings, this);
    });

    this.registerEvent(
      this.app.workspace.on("editor-menu", this.handleHighlighterInContextMenu)
    );

    this.addSettingTab(new HighlightrSettingTab(this.app, this));

    this.addCommand({
      id: "highlighter-plugin-menu",
      name: "Open Highlightr",
      icon: "highlightr-pen",
      editorCallback: (editor: EnhancedEditor) => {
        !document.querySelector(".menu.highlighterContainer")
          ? highlighterMenu(this.app, this.settings, editor)
          : true;
      },
    });

    addEventListener("Highlightr-NewCommand", () => {
      this.reloadStyles(this.settings);
      this.generateCommands(this.editor);
      createHighlighterIcons(this.settings, this);
    });
    this.generateCommands(this.editor);
    this.refresh();
  }

  reloadStyles(settings: HighlightrSettings) {
    let currentSheet = document.querySelector("style#highlightr-styles");
    if (currentSheet) {
      currentSheet.remove();
      createStyles(settings);
    } else {
      createStyles(settings);
    }
  }

  eraseHighlight = (editor: Editor) => {
    const currentStr = editor.getSelection();
    const newStr = currentStr
      .replace(/\<mark style.*?[^\>]\>/g, "")
      .replace(/\<mark class.*?[^\>]\>/g, "")
      .replace(/\<\/mark>/g, "");
    editor.replaceSelection(newStr);
    editor.focus();
  };

  generateCommands(editor: Editor) {
    this.settings.highlighterOrder.forEach((highlighterKey: string) => {
      const applyCommand = (command: CommandPlot, editor: Editor) => {
        const selectedText = editor.getSelection();
        const curserStart = editor.getCursor("from");
        const curserEnd = editor.getCursor("to");
        const prefix = command.prefix;
        const suffix = command.suffix || prefix;
        const setCursor = (mode: number) => {
          editor.setCursor(
            curserStart.line + command.line * mode,
            curserEnd.ch + cursorPos * mode
          );
        };
        const cursorPos =
          selectedText.length > 0
            ? prefix.length + suffix.length + 1
            : prefix.length;
        const preStart = {
          line: curserStart.line - command.line,
          ch: curserStart.ch - prefix.length,
        };
        const pre = editor.getRange(preStart, curserStart);

        const sufEnd = {
          line: curserStart.line + command.line,
          ch: curserEnd.ch + suffix.length,
        };

        const suf = editor.getRange(curserEnd, sufEnd);

        const preLast = pre.slice(-1);
        const prefixLast = prefix.trimStart().slice(-1);
        const sufFirst = suf[0];

        if (suf === suffix.trimEnd()) {
          if (preLast === prefixLast && selectedText) {
            editor.replaceRange(selectedText, preStart, sufEnd);
            const changeCursor = (mode: number) => {
              editor.setCursor(
                curserStart.line + command.line * mode,
                curserEnd.ch + (cursorPos * mode + 8)
              );
            };
            return changeCursor(-1);
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
          prefix:
            this.settings.highlighterMethods === "css-classes"
              ? `<mark class="hltr-${highlighterKey.toLowerCase()}">`
              : `<mark style="background: ${this.settings.highlighters[highlighterKey]};">`,
          suffix: "</mark>",
        },
      };

      Object.keys(commandsMap).forEach((type) => {
        let highlighterpen = `highlightr-pen-${highlighterKey}`.toLowerCase();
        this.addCommand({
          id: highlighterKey,
          name: highlighterKey,
          icon: highlighterpen,
          editorCallback: async (editor: Editor) => {
            applyCommand(commandsMap[type], editor);
            await wait(10);
            editor.focus();
          },
        });
      });

      this.addCommand({
        id: "unhighlight",
        name: "Remove highlight",
        icon: "highlightr-eraser",
        editorCallback: async (editor: Editor) => {
          this.eraseHighlight(editor);
          editor.focus();
        },
      });
    });
  }

  refresh = () => {
    this.updateStyle();
  };

  updateStyle = () => {
    document.body.classList.toggle(
      "highlightr-lowlight",
      this.settings.highlighterStyle === "lowlight"
    );
    document.body.classList.toggle(
      "highlightr-floating",
      this.settings.highlighterStyle === "floating"
    );
    document.body.classList.toggle(
      "highlightr-rounded",
      this.settings.highlighterStyle === "rounded"
    );
    document.body.classList.toggle(
      "highlightr-realistic",
      this.settings.highlighterStyle === "realistic"
    );
  };

  onunload() {
    console.log("Highlightr unloaded");
  }

  handleHighlighterInContextMenu = (
    menu: Menu,
    editor: EnhancedEditor
  ): void => {
    contextMenu(this.app, menu, editor, this, this.settings);
  };

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
