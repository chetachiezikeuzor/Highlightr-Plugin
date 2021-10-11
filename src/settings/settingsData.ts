export interface Highlighters {
  color: any;
  value: string;
}

export interface HighlightrSettings {
  aestheticStyle: boolean;
  highlighters: Highlighters[];
}

export const DEFAULT_SETTINGS: HighlightrSettings = {
  aestheticStyle: false,
  highlighters: [
    {
      color: "Pink",
      value: "#FFB8EB",
    },
    {
      color: "Red",
      value: "#FF5582",
    },
    {
      color: "Orange",
      value: "#FFB86C",
    },
    {
      color: "Yellow",
      value: "#FFF3A3",
    },
    {
      color: "Green",
      value: "#BBFABB",
    },
    {
      color: "Cyan",
      value: "#ABF7F7",
    },
    {
      color: "Blue",
      value: "#ADCCFF",
    },
    {
      color: "Purple",
      value: "#D2B3FF",
    },
    {
      color: "Grey",
      value: "#CACFD9",
    },
  ],
};
