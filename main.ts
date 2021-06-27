import {
    App,
    Modal,
    Notice,
    Plugin,
    PluginSettingTab,
    Setting,
} from "obsidian";

interface MyPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: "default",
};

/**
 * Transform the case in `value` (`string`) to match that of `base` (`string`).
 *
 * @param {string} value
 * @param {string} base
 * @returns {string}
 */

const translations = {
    // العربية
    ar: {},

    // čeština
    cz: {},

    // Dansk
    da: {},

    // Deutsch
    de: {},

    // English
    en: {
        //main
        "Highlight Text": "Highlight Text",
        "Unhighlight Text": "Unhighlight Text",
        //_constants.ts
        Highlightr: "Highlightr",
        //added to Context Menu
        Highlight: "Highlight",
        Unhighlight: "Unhighlight",
        //settingsTab.ts
        "Highlightr Settings": "Highlightr Settings",
        "Click ": "Click ",
        here: "here",
        "Pick Highlighter Style": "Pick Highlighter Style",
        "Coming soon...": "Coming soon...",
        "Click Here": "Click Here",
        "More Information": "More Information",
        "View Information about the Plugin.":
            "View Information about the Plugin.",
        "More Info": "More Info",
        Donate: "Donate",
        "If you like this Plugin, consider donating to support continued development:":
            "If you like this Plugin, consider donating to support continued development:",
        "Here you can edit the Template for newly created Files.":
            "Here you can edit the Template for newly created Files.",
        "Click for a List of Variables": "Click for a List of Variables",
        Template: "Template",
        Miscellaneous: "Miscellaneous",

        'This Plugin is using <a href="https://feathericons.com/">Feather Icons</a>':
            'This Plugin is using <a href="https://feathericons.com/">Feather Icons</a>',
        "Choose a Highlight Color": "Choose a Highlight Color",
        //highlighterModal
        Pink: "Pink",
        Red: "Red",
        Orange: "Orange",
        Yellow: "Yellow",
        Green: "Green",
        Blue: "Blue",
        Purple: "Purple",
    },

    // British English
    enGB: {},

    // Español
    es: {},

    // français
    fr: {},

    // हिन्दी
    hi: {},

    // Bahasa Indonesia
    id: {},

    // Italiano
    it: {},

    // 日本語
    ja: {},

    // 한국어
    ko: {},

    // Nederlands
    nl: {},

    // Norsk
    no: {},

    // język polski
    pl: {},

    // Português
    pt: {},

    // Português do Brasil
    // Brazilian Portuguese
    ptBR: {},

    // Română
    ro: {},

    // русский
    ru: {},

    // Türkçe
    tr: {},

    // 简体中文
    zhCN: {},

    // 繁體中文
    zhTW: {},
};

const localeMap = {
    ar,
    cs: cz,
    da,
    de,
    en,
    "en-gb": enGB,
    es,
    fr,
    hi,
    id,
    it,
    ja,
    ko,
    nl,
    nn: no,
    pl,
    pt,
    "pt-br": ptBR,
    ro,
    ru,
    tr,
    "zh-cn": zhCN,
    "zh-tw": zhTW,
};

const locale = localeMap[obsidian.moment.locale()];
function t(str) {
    if (!locale) {
        console.error(
            "Error: highlightr locale not found",
            obsidian.moment.locale()
        );
    }
    return (locale && locale[str]) || en[str];
}

const DEFAULT_SETTINGS = {};

var highlighterColorsMap = [
    //This could be a flat object
    { color: "Pink", value: "#FFB8EB" },
    { color: "Red", value: "#FF5582" },
    { color: "Orange", value: "#FFB86C" },
    { color: "Yellow", value: "#FFF3A3" },
    { color: "Green", value: "#BBFABB" },
    { color: "Blue", value: "#ADCCFF" },
    { color: "Purple", value: "#D2B3FF" },
    { color: "Grey", value: "#CACFD9" },
];

class HighlighterPopover extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.createContainer();
    }
    createContainer() {
        const activeLeaf = this.app.workspace.activeLeaf;

        let newDiv = document.createElement("div");

        newDiv.setAttribute("id", "highlighterContainer");
        document.body.appendChild(newDiv); // adding element to the body.

        // create var for container.
        var colorButtonContainer = document.getElementById(
            "highlighterContainer"
        );

        // create ul element and set the id attribute.
        var colorButtons = document.createElement("ul");
        colorButtons.setAttribute("id", "highlightColorButtonList");

        colorButtons.addEventListener("mousedown", function (event) {
            event.preventDefault();
        });

        var colorTranslucency = "A6";

        for (
            var i = 0;
            i < highlighterColorsMap.map((a) => a.color).length;
            i++
        ) {
            var colorButton = document.createElement("li");
            colorButton.setAttribute(
                "id",
                highlighterColorsMap.map((a) => a.value)[i] + colorTranslucency
            );

            var colorButtonText = document.createElement("span");
            colorButtonText.innerHTML = highlighterColorsMap.map(
                (a) => a.color
            )[i];

            var colorButtonIcon = document.createElement("span");
            colorButtonIcon.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.1em" height="1.1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10a5 5 0 0 1 0 10z"/></svg>';
            colorButtonIcon.setAttribute(
                "style",
                "margin-right: 8px; vertical-align: -.15em; display: inline-flex;"
            );
            colorButtonIcon.style.fill =
                highlighterColorsMap.map((a) => a.value)[i] + colorTranslucency;

            colorButtons.appendChild(colorButton);

            for (var j = 0; j < 1; j++) {
                colorButton.appendChild(colorButtonIcon);
                colorButton.appendChild(colorButtonText);
            }

            colorButton.addEventListener("click", function () {
                let ulElement = document.getElementById(
                    "highlightColorButtonList"
                );
                while (ulElement.firstChild) {
                    ulElement.removeChild(ulElement.firstChild);
                    let divElement = document.getElementById(
                        "highlighterContainer"
                    );
                    while (divElement.firstChild) {
                        divElement.removeChild(divElement.firstChild);
                    }
                }
            });

            colorButtonContainer.appendChild(colorButtons); // add list to the container.
        }

        document
            .getElementById("highlightColorButtonList")
            .addEventListener("click", function (e) {
                // e.target is the targetted element.
                if (e.target && e.target.nodeName == "LI") {
                    var pickedColor = e.target.id;
                } else if (e.target && e.target.nodeName == "SPAN") {
                    var pickedColor = e.target.parentNode.id;
                } else if (e.target && e.target.nodeName == "svg") {
                    var pickedColor = e.target.parentNode.parentNode.id;
                } else if (e.target && e.target.nodeName == "path") {
                    var pickedColor =
                        e.target.parentNode.parentNode.parentNode.id;
                } else if (e.target && e.target.nodeName == "UL") {
                    var pickedColor = e.target.firstChild.id;
                }

                console.log(activeLeaf.view.editor.getSelection());
                var selection = activeLeaf.view.editor.getSelection();

                activeLeaf.view.editor.replaceSelection(
                    '<mark style="background: ' +
                        pickedColor +
                        ';">' +
                        selection +
                        "</mark>"
                );
                console.log(pickedColor);
                console.log(e.target.nodeName);
                //debugger

                let ulElement = document.getElementById(
                    "highlightColorButtonList"
                );
                if (ulElement) {
                    if (ulElement.firstChild) {
                        ulElement.removeChild(ulElement.firstChild);
                        let divElement = document.getElementById(
                            "highlighterContainer"
                        );
                        while (divElement.firstChild) {
                            divElement.removeChild(divElement.firstChild);
                        }
                    }
                }
            });

        var scope = document.querySelector("body");
        scope.addEventListener("contextmenu", (event) => {
            var { clientX: mouseX, clientY: mouseY } = event;

            colorButtonContainer.style.top = `${mouseY}px`;
            colorButtonContainer.style.left = `${mouseX}px`;
        });

        newDiv.remove();
    }
}
class SettingsTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        const { containerEl, plugin } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: t("Highlightr Settings") });
        new obsidian.Setting(containerEl)
            .setName(t("Pick Highlighter Style"))
            .setDesc(t("Coming soon..."));
        containerEl.createEl("h3", { text: t("Miscellaneous") });
        new obsidian.Setting(containerEl)
            .setName(t("More Information"))
            .setDesc(t("View Information about the Plugin."))
            .setClass("extra")
            .addButton((bt) => {
                bt.setButtonText(t("More Info"));
                bt.onClick((_) => {
                    new InfoModal(plugin).open();
                });
            });
        new obsidian.Setting(containerEl)
            .setName(t("Donate"))
            .setDesc(
                t(
                    "If you like this Plugin, consider donating to support continued development:"
                )
            )
            .setClass("extra")
            .addButton((bt) => {
                bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/chetachi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=chetachi&button_colour=e3e7ef&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>`;
            });
    }
    async save() {
        await this.plugin.saveSettings();
    }
}

function handleContextMenu(menu, instance, plugin) {
    if (instance.getSelection()) {
        if (!plugin.settings.shouldShowSynonymPopover) {
            menu.addItem((item) => {
                item.setTitle(t("Highlight"))
                    .setIcon("highlightpen")
                    .onClick(async (_) => {
                        await plugin.handlePointerUp();
                    });
            });
        }
        menu.addItem((item) => {
            item.setTitle(t("Unhighlight"))
                .setIcon("eraser")
                .onClick((_) => {
                    if (instance.getSelection()) {
                        var currentStr = instance.getSelection();
                        var newStr = currentStr.replace(/\<.*?[^\>]\>/g, "");
                        // Printing the new string :)
                        instance.replaceSelection(newStr);
                    }
                });
        });
    }
}

const icons = {
    eraser: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><path d="M2.586 15.408l4.299 4.299a.996.996 0 0 0 .707.293h12.001v-2h-6.958l7.222-7.222c.78-.779.78-2.049 0-2.828L14.906 3a2.003 2.003 0 0 0-2.828 0l-4.75 4.749l-4.754 4.843a2.007 2.007 0 0 0 .012 2.816zM13.492 4.414l4.95 4.95l-2.586 2.586L10.906 7l2.586-2.586zM8.749 9.156l.743-.742l4.95 4.95l-4.557 4.557a1.026 1.026 0 0 0-.069.079h-1.81l-4.005-4.007l4.748-4.837z"/></svg>`,
    highlightpen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><path d="M20.707 5.826l-3.535-3.533a.999.999 0 0 0-1.408-.006L7.096 10.82a1.01 1.01 0 0 0-.273.488l-1.024 4.437L4 18h2.828l1.142-1.129l3.588-.828c.18-.042.345-.133.477-.262l8.667-8.535a1 1 0 0 0 .005-1.42zm-9.369 7.833l-2.121-2.12l7.243-7.131l2.12 2.12l-7.242 7.131zM4 20h16v2H4z"/></svg>g>`,
};
const addIcons = () => {
    Object.keys(icons).forEach((key) => {
        obsidian.addIcon(key, icons[key]);
    });
};

export default class HighlightrPlugin extends Plugin {
    constructor() {
        super(...arguments);
        this.highlighterPopover = null;
        this.menus = [
            {
                pluginName: this.manifest.id,
                name: t("Highlight"),
                icon: "highlightpen",
                onClick: (instance) => {
                    if (instance.getSelection()) {
                        this.handlePointerUp();
                    }
                },
                enabled: true,
            },
            {
                pluginName: this.manifest.id,
                name: t("Unhighlight"),
                icon: "eraser",
                onClick: (instance) => {
                    if (instance.getSelection()) {
                        var currentStr = instance.getSelection();
                        var newStr = currentStr.replace(/\<.*?[^\>]\>/g, "");
                        // Printing the new string :)
                        instance.replaceSelection(newStr);
                    }
                },
                enabled: true,
            },
        ];

        // Open the highlighter popover if a word is selected
        // This is debounced to handle double clicks
        this.handlePointerUp = obsidian.debounce(() => {
            const activeLeaf = this.app.workspace.activeLeaf;
            if (
                (activeLeaf === null || activeLeaf === void 0
                    ? void 0
                    : activeLeaf.view) instanceof obsidian.MarkdownView
            ) {
                const view = activeLeaf.view;
                if (view.getMode() === "source") {
                    const editor = view.editor;
                    const selection = editor.getSelection();
                    // Return early if we don't have anything selected, or if
                    // multiple words are selected
                    const cursor = editor.getCursor("from");
                    const line = editor.getLine(cursor.line);
                    let coords;
                    // Get the cursor position using the appropriate CM5 or CM6 interface
                    if (editor.cursorCoords) {
                        coords = editor.cursorCoords(true, "window");
                    } else if (editor.coordsAtPos) {
                        const offset = editor.posToOffset(cursor);
                        coords = editor.coordsAtPos(offset);
                    } else {
                        return;
                    }
                    this.highlighterPopover = HighlighterPopover(
                        activeLeaf,
                        editor,
                        this.app,
                        this
                    );
                }
            }
        });
    }
    onload() {
        console.log("Loading Highlightr");
        yield this.loadSettings();
        addIcons();
        this.addSettingTab(new SettingsTab(this.app, this));
        this.addCommand({
            name: t("Highlight Text"),
            callback: () => {},
        });
        this.registerDomEvent(document.body, "pointerup", () => {
            if (!this.settings.shouldShowSynonymPopover) {
                return;
            }
            this.handlePointerUp();
        });
        this.registerDomEvent(window, "keydown", () => {
            // Destroy the popover if it's open
            if (this.highlighterPopover) {
                this.highlighterPopover = null;
            }
        });
        this.registerEvent(
            this.app.workspace.on("editor-menu", (menu, editor, _) => {
                handleContextMenu(menu, editor, this);
            })
        );
    }
    onunload() {
        console.log("Unloading Highlightr");
    }
    async loadSettings() {
        this.settings = Object.assign(
            {},
            DEFAULT_SETTINGS,
            await this.loadData()
        );
    }
    async saveSettings() {
        await this.saveData(this.settings);
    }
}
