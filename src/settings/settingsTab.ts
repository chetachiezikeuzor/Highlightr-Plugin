import type HighlightrPlugin from "src/plugin/main";
import {
  App,
  Setting,
  PluginSettingTab,
  Notice,
  TextComponent,
} from "obsidian";
import Pickr from "@simonwep/pickr";
import Sortable from "sortablejs";
import { HIGHLIGHTER_METHODS, HIGHLIGHTER_STYLES } from "./settingsData";
import { setAttributes } from "src/utils/setAttributes";

export class HighlightrSettingTab extends PluginSettingTab {
  plugin: HighlightrPlugin;
  appendMethod: string;

  constructor(app: App, plugin: HighlightrPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h1", { text: "Highlightr" });
    containerEl.createEl("p", { text: "Created by " }).createEl("a", {
      text: "Chetachi 👩🏽‍💻",
      href: "https://github.com/chetachiezikeuzor",
    });
    containerEl.createEl("h2", { text: "Plugin Settings" });

    new Setting(containerEl)
      .setName("Choose highlight method")
      .setDesc(
        `Choose between highlighting with inline CSS or CSS classes. Please note that there are pros and cons to both choices. Inline CSS will keep you from being reliant on external CSS files if you choose to export your notes. CSS classes are more flexible and easier to customize.`
      )
      .addDropdown((dropdown) => {
        let methods: Record<string, string> = {};
        HIGHLIGHTER_METHODS.map((method) => (methods[method] = method));
        dropdown.addOptions(methods);
        dropdown
          .setValue(this.plugin.settings.highlighterMethods)
          .onChange((highlightrMethod) => {
            this.plugin.settings.highlighterMethods = highlightrMethod;
            setTimeout(() => {
              dispatchEvent(new Event("Highlightr-NewCommand"));
            }, 100);
            this.plugin.saveSettings();
            this.plugin.saveData(this.plugin.settings);
            this.display();
          });
      });

    const stylesSetting = new Setting(containerEl);

    stylesSetting
      .setName("Choose highlight style")
      .setDesc(
        `Depending on your design aesthetic, you may want to customize the style of your highlights. Choose from an assortment of different highlighter styles by using the dropdown. Depending on your theme, this plugin's CSS may be overriden.`
      )
      .addDropdown((dropdown) => {
        let styles: Record<string, string> = {};
        HIGHLIGHTER_STYLES.map((style) => (styles[style] = style));
        dropdown.addOptions(styles);
        dropdown
          .setValue(this.plugin.settings.highlighterStyle)
          .onChange((highlighterStyle) => {
            this.plugin.settings.highlighterStyle = highlighterStyle;
            this.plugin.saveSettings();
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          });
      });

    const styleDemo = () => {
      const d = createEl("p");
      d.setAttribute("style", "font-size: .925em; margin-top: 12px;");
      d.innerHTML = `
      <span style="background:#FFB7EACC;padding: .125em .125em;--lowlight-background: var(--background-primary);border-radius: 0;background-image: linear-gradient(360deg,rgba(255, 255, 255, 0) 40%,var(--lowlight-background) 40%) !important;">Lowlight</span> 
      <span style="background:#93C0FFCC;--floating-background: var(--background-primary);border-radius: 0;padding-bottom: 5px;background-image: linear-gradient(360deg,rgba(255, 255, 255, 0) 28%,var(--floating-background) 28%) !important;">Floating</span> 
      <span style="background:#9CF09CCC;margin: 0 -0.05em;padding: 0.1em 0.4em;border-radius: 0.8em 0.3em;-webkit-box-decoration-break: clone;box-decoration-break: clone;text-shadow: 0 0 0.75em var(--background-primary-alt);">Realistic</span> 
      <span style="background:#CCA9FFCC;margin: 0 -0.05em;padding: 0.125em 0.15em;border-radius: 0.2em;-webkit-box-decoration-break: clone;box-decoration-break: clone;">Rounded</span>`;
      return d;
    };

    stylesSetting.infoEl.appendChild(styleDemo());

    const highlighterSetting = new Setting(containerEl);

    highlighterSetting
      .setName("Choose highlight colors")
      .setClass("highlighterplugin-setting-item")
      .setDesc(
        `Create new highlight colors by providing a color name and using the color picker to set the hex code value. Don't forget to save the color before exiting the color picker. Drag and drop the highlight color to change the order for your highlighter component.`
      );

    const colorInput = new TextComponent(highlighterSetting.controlEl);
    colorInput.setPlaceholder("Color name");
    colorInput.inputEl.addClass("highlighter-settings-color");

    const valueInput = new TextComponent(highlighterSetting.controlEl);
    valueInput.setPlaceholder("Color hex code");
    valueInput.inputEl.addClass("highlighter-settings-value");

    highlighterSetting
      .addButton((button) => {
        button.setClass("highlightr-color-picker");
      })
      .then(() => {
        let input = valueInput.inputEl;
        let currentColor = valueInput.inputEl.value || null;

        const colorMap = this.plugin.settings.highlighterOrder.map(
          (highlightKey) => this.plugin.settings.highlighters[highlightKey]
        );

        let colorHex;
        let pickrCreate = new Pickr({
          el: ".highlightr-color-picker",
          theme: "nano",
          swatches: colorMap,
          defaultRepresentation: "HEXA",
          default: colorMap[colorMap.length - 1],
          comparison: false,
          components: {
            preview: true,
            opacity: true,
            hue: true,
            interaction: {
              hex: true,
              rgba: true,
              hsla: false,
              hsva: false,
              cmyk: false,
              input: true,
              clear: true,
              cancel: true,
              save: true,
            },
          },
        });

        pickrCreate
          .on("clear", function (instance: Pickr) {
            instance.hide();
            input.trigger("change");
          })
          .on("cancel", function (instance: Pickr) {
            currentColor = instance.getSelectedColor().toHEXA().toString();

            input.trigger("change");
            instance.hide();
          })
          .on("change", function (color: Pickr.HSVaColor) {
            colorHex = color.toHEXA().toString();
            let newColor;
            colorHex.length == 6
              ? (newColor = `${color.toHEXA().toString()}A6`)
              : (newColor = color.toHEXA().toString());
            colorInput.inputEl.setAttribute(
              "style",
              `background-color: ${newColor}; color: var(--text-normal);`
            );

            setAttributes(input, {
              value: newColor,
              style: `background-color: ${newColor}; color: var(--text-normal);`,
            });
            input.setText(newColor);
            input.textContent = newColor;
            input.value = newColor;
            input.trigger("change");
          })
          .on("save", function (color: Pickr.HSVaColor, instance: Pickr) {
            let newColorValue = color.toHEXA().toString();

            input.setText(newColorValue);
            input.textContent = newColorValue;
            input.value = newColorValue;
            input.trigger("change");

            instance.hide();
            instance.addSwatch(color.toHEXA().toString());
          });
      })
      .addButton((button) => {
        button
          .setClass("HighlightrSettingsButton")
          .setClass("HighlightrSettingsButtonAdd")
          .setIcon("highlightr-save")
          .setTooltip("Save")
          .onClick(async (buttonEl: any) => {
            let color = colorInput.inputEl.value.replace(" ", "-");
            let value = valueInput.inputEl.value;

            if (color && value) {
              if (!this.plugin.settings.highlighterOrder.includes(color)) {
                this.plugin.settings.highlighterOrder.push(color);
                this.plugin.settings.highlighters[color] = value;
                setTimeout(() => {
                  dispatchEvent(new Event("Highlightr-NewCommand"));
                }, 100);
                await this.plugin.saveSettings();
                this.display();
              } else {
                buttonEl.stopImmediatePropagation();
                new Notice("This color already exists");
              }
            }
            color && !value
              ? new Notice("Highlighter hex code missing")
              : !color && value
              ? new Notice("Highlighter name missing")
              : new Notice("Highlighter values missing"); // else
          });
      });

    const highlightersContainer = containerEl.createEl("div", {
      cls: "HighlightrSettingsTabsContainer",
    });

    Sortable.create(highlightersContainer, {
      animation: 500,
      ghostClass: "highlighter-sortable-ghost",
      chosenClass: "highlighter-sortable-chosen",
      dragClass: "highlighter-sortable-drag",
      dragoverBubble: true,
      forceFallback: true,
      fallbackClass: "highlighter-sortable-fallback",
      easing: "cubic-bezier(1, 0, 0, 1)",
      onSort: (command: { oldIndex: number; newIndex: number }) => {
        const arrayResult = this.plugin.settings.highlighterOrder;
        const [removed] = arrayResult.splice(command.oldIndex, 1);
        arrayResult.splice(command.newIndex, 0, removed);
        this.plugin.settings.highlighterOrder = arrayResult;
        this.plugin.saveSettings();
      },
    });

    this.plugin.settings.highlighterOrder.forEach((highlighter) => {
      const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill=${this.plugin.settings.highlighters[highlighter]} stroke=${this.plugin.settings.highlighters[highlighter]} stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><path d="M20.707 5.826l-3.535-3.533a.999.999 0 0 0-1.408-.006L7.096 10.82a1.01 1.01 0 0 0-.273.488l-1.024 4.437L4 18h2.828l1.142-1.129l3.588-.828c.18-.042.345-.133.477-.262l8.667-8.535a1 1 0 0 0 .005-1.42zm-9.369 7.833l-2.121-2.12l7.243-7.131l2.12 2.12l-7.242 7.131zM4 20h16v2H4z"/></svg>`;
      const settingItem = highlightersContainer.createEl("div");
      settingItem.addClass("highlighter-item-draggable");
      const colorIcon = settingItem.createEl("span");
      colorIcon.addClass("highlighter-setting-icon");
      colorIcon.innerHTML = icon;

      new Setting(settingItem)
        .setClass("highlighter-setting-item")
        .setName(highlighter)
        .setDesc(this.plugin.settings.highlighters[highlighter])
        .addButton((button) => {
          button
            .setClass("HighlightrSettingsButton")
            .setClass("HighlightrSettingsButtonDelete")
            .setIcon("highlightr-delete")
            .setTooltip("Remove")
            .onClick(async () => {
              new Notice(`${highlighter} highlight deleted`);
              (this.app as any).commands.removeCommand(
                `highlightr-plugin:${highlighter}`
              );
              delete this.plugin.settings.highlighters[highlighter];
              this.plugin.settings.highlighterOrder.remove(highlighter);
              setTimeout(() => {
                dispatchEvent(new Event("Highlightr-NewCommand"));
              }, 100);
              await this.plugin.saveSettings();
              this.display();
            });
        });

      const a = createEl("a");
      a.setAttribute("href", "");
    });
    const hltrDonationDiv = containerEl.createEl("div", {
      cls: "hltrDonationSection",
    });

    const donateText = createEl("p");
    donateText.appendText(
      "If you like this Plugin and are considering donating to support continued development, use the buttons below!"
    );

    hltrDonationDiv.appendChild(donateText);
    hltrDonationDiv.appendChild(
      paypalButton("https://paypal.me/chelseaezikeuzor")
    );
    hltrDonationDiv.appendChild(
      buyMeACoffeeButton("https://www.buymeacoffee.com/chetachi")
    );
    hltrDonationDiv.appendChild(kofiButton("https://ko-fi.com/chetachi"));
  }
}

const buyMeACoffeeButton = (link: string): HTMLElement => {
  const a = createEl("a");
  a.setAttribute("href", link);
  a.addClass("buymeacoffee-chetachi-img");
  a.innerHTML = `<img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=chetachi&button_colour=e3e7ef&font_colour=262626&font_family=Poppins&outline_colour=262626&coffee_colour=ff0000" height="42px"> `;
  return a;
};

const paypalButton = (link: string): HTMLElement => {
  const a = createEl("a");
  a.setAttribute("href", link);
  a.addClass("buymeacoffee-chetachi-img");
  a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="40">
  <path fill="#253B80" d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z"></path>
  <path fill="#179BD7" d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z"></path>
  <path fill="#253B80" d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 0 1 .314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73c-.522 0-1.029.188-1.427.525a2.21 2.21 0 0 0-.744 1.328l-.055.299-.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 0 1-.096.035H7.266z"></path>
  <path fill="#179BD7" d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0-1.336-1.03z"></path>
  <path fill="#222D65" d="M21.754 7.151a9.757 9.757 0 0 0-1.203-.267 15.284 15.284 0 0 0-2.426-.177h-7.352a1.172 1.172 0 0 0-1.159.992L8.05 17.605l-.045.289a1.336 1.336 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 0 0-1.017-.429 9.045 9.045 0 0 0-.277-.087z"></path>
  <path fill="#253B80" d="M9.614 7.699a1.169 1.169 0 0 1 1.159-.991h7.352c.871 0 1.684.057 2.426.177a9.757 9.757 0 0 1 1.481.353c.365.121.704.264 1.017.429.368-2.347-.003-3.945-1.272-5.392C20.378.682 17.853 0 14.622 0h-9.38c-.66 0-1.223.48-1.325 1.133L.01 25.898a.806.806 0 0 0 .795.932h5.791l1.454-9.225 1.564-9.906z"></path>
  </svg>`;
  return a;
};

const kofiButton = (link: string): HTMLElement => {
  const a = createEl("a");
  a.setAttribute("href", link);
  a.addClass("buymeacoffee-chetachi-img");
  a.innerHTML = `<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/kofi_color.svg" height="50">`;
  return a;
};
