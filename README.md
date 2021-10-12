---
date updated: "2021-10-11T19:49:52-05:00"
---

# Highlightr-Plugin

![Highlightr-Plugin Downloads](https://img.shields.io/github/downloads/chetachiezikeuzor/Highlightr-Plugin/total.svg)
![Highlightr-Plugin Releases](https://img.shields.io/github/v/release/chetachiezikeuzor/Highlightr-Plugin)

<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/Highlightr%20Demo%20Header.png" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

### Status: This plugin will be available in Obsidian plugin store once it has been accepted

_Sigh_. Don't you wish you could satiate your creative drive by highlighting your notes? I mean, yes we can use the markdown syntax for creating highlights, but what about custom colors?? Oh yea, we know all about those cool CSS hacks that would "support" this, but what ever happened to avoiding proprietary formatting? Ok, well we could just use HTML `<mark>` tags right? But jeez, it's such a pain to type out! Alright alright, how about a Templater template? [Kinda like this one](https://www.reddit.com/r/ObsidianMD/comments/nu0olr/multicolored_highlighting_in_obsidian/). But this just doesn't feel… native. Well, looks like Highlightr is here to save the day!!!

Highlightr is a simple plugin that brings a minimal and aesthetically pleasing highlighting menu into the Obsidian note-taking app. This plugin makes color-coded highlighting much easier with a user-friendly assortment of highlight colors.

## Demo

<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/highlightr-demo.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

## Ease of Use

Make beautiful highlights in your notes to supplement your note-taking. The colors included were chosen to be universal across themes, in both light and dark mode. The use of inline CSS is essential in maintaining the longevity of your notes. When you export, you will not be reliant on any external CSS styling. This will make your notes much more flexible!

## How it Works

Although the plugin supplies you with a beautiful assortment of colors, you are free to customize your highlighter menu as you wish! Create new highlighter colors by openning the plugin settings tab. There, you will see an input, color picker and an `add` button. Use the input to set the name of your brand new highlight, then use the color picker to pick the color for said highlight. Then use the `add` button to add the color into your highlighter menu.

<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/image2.png" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/highlightrdemo1.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

Obsidian app version 12.8 adds a powerful custom context menu for easier note-taking. This plugin adds 2 menu items: Highlight and Unhighlight. These menu items can only be seen on text selection. Clicking "Highlight" will trigger the highlighting menu, allowing you to choose from an assortment of colors. When you choose a color, your selected text will then be wrapped within HTML mark tags, including a color for the background that corresponds with the color you have chosen. Clicking "Unhighlight" will replace text that is within the string `<`, `/>`. That means that you can use this to remove HTML markings, and not just highlight marks.

<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/highlightr-demo.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/image1.png" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

You can also use the new command added in version [1.0.0]() to open your highlighlighter menu. Now, you can open your highlighting menu with a hotkey of your choosing. You will be able to add hotkeys to each individual highlighter color from your highlighter menu, as the plugin creates command for each highlighter as well.

<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/highlighterdemo2.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/highlightr.png" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

## Installation

This plugin is not yet available in the Obsidian community plugin store. You can install it from there once it has been accepted. For a manual installation, you can download the necessary files and place them within your plugins folder.

---

## Changelog

### [1.0.0](https://github.com/chetachiezikeuzor/Highlightr-Plugin/releases/tag/1.0.0) - Oct 10, 2021

##### Added

- Added new setting to customize highlighter colors.
  <img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/highlightrdemo1.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">
- Added command to open highlighter palette
- Added function to add commands per highlighter
  <img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/highlighterdemo2.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

---

## Checklist

- [x] Highlighter color commands
- [x] Open highlighter palette with command
- [x] Customize highlighter colors

---

## Support

If you like this Plugin and are considering donating to support continued development, use the button below!

Created with ❤️ by Chetachi

<a href="https://www.buymeacoffee.com/chetachi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&amp;emoji=&amp;slug=chetachi&amp;button_colour=e3e7ef&amp;font_colour=262626&amp;font_family=Inter&amp;outline_colour=262626&amp;coffee_colour=ff0000"></a>

<a href="https://paypal.me/chelseaezikeuzor">
<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/paypal.svg" height="70"></a>
