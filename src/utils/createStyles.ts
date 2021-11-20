import { HighlightrSettings } from "src/settings/settingsData";
import { setAttributes } from "./setAttributes";

function addNewStyle(selector: any, style: any, sheet: HTMLElement) {
  sheet.textContent += selector + `{\n ${style}\n}\n\n`;
}

export function createStyles(settings: HighlightrSettings) {
  let styleSheet = document.createElement("style");
  setAttributes(styleSheet, {
    type: "text/css",
    id: "highlightr-styles",
  });

  let header = document.getElementsByTagName("HEAD")[0];
  header.appendChild(styleSheet);

  Object.keys(settings.highlighters).forEach((highlighter) => {
    let colorLowercase = highlighter.toLowerCase();
    addNewStyle(
      `.hltr-${colorLowercase},\nmark.hltr-${colorLowercase},\n.markdown-preview-view mark.hltr-${colorLowercase}`,
      `background: ${settings.highlighters[highlighter]};`,
      styleSheet
    );
  });
}
