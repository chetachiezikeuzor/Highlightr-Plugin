export const HIGHLIGHTER_STYLES = [
  "none",
  "lowlight",
  "floating",
  "rounded",
  "realistic",
];

export interface Highlighters {
  color: any;
  value: string;
}

export interface HighlightrSettings {
  highlighterStyle: string;
  highlighters: Highlighters[];
}

export const DEFAULT_SETTINGS: HighlightrSettings = {
  highlighterStyle: "none",
  highlighters: [
    {
      color: "Pink",
      value: "#FFB8EBA6",
    },
    {
      color: "Red",
      value: "#FF5582A6",
    },
    {
      color: "Orange",
      value: "#FFB86CA6",
    },
    {
      color: "Yellow",
      value: "#FFF3A3A6",
    },
    {
      color: "Green",
      value: "#BBFABBA6",
    },
    {
      color: "Cyan",
      value: "#ABF7F7A6",
    },
    {
      color: "Blue",
      value: "#ADCCFFA6",
    },
    {
      color: "Purple",
      value: "#D2B3FFA6",
    },
    {
      color: "Grey",
      value: "#CACFD9A6",
    },
  ],
};
