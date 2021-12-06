# Highlightr-Plugin

![Highlightr-Plugin Downloads](https://img.shields.io/github/downloads/chetachiezikeuzor/Highlightr-Plugin/total.svg)
![Highlightr-Plugin Releases](https://img.shields.io/github/v/release/chetachiezikeuzor/Highlightr-Plugin)

<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/Highlightr%20Demo%20Header.png" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

### Status: This plugin will be available in Obsidian plugin store once it has been accepted

_Sigh_. Don't you wish you could satiate your creative drive by highlighting your notes? I mean, yes we can use the markdown syntax for creating highlights, but what about custom colors?? Oh yea, we know all about those cool CSS hacks that would "support" this, but what ever happened to avoiding proprietary formatting? Ok, well we could just use HTML `<mark>` tags right? But jeez, it's such a pain to type out! Alright alright, how about a Templater template? [Kinda like this one](https://www.reddit.com/r/ObsidianMD/comments/nu0olr/multicolored_highlighting_in_obsidian/). But this just doesn't feel… native. Well, looks like Highlightr is here to save the day!!!

Highlightr is a simple plugin that brings a minimal and aesthetically pleasing highlighting menu into the Obsidian note-taking app. This plugin makes color-coded highlighting much easier with a user-friendly assortment of highlight colors.

## Demo

<img src="https://user-images.githubusercontent.com/79069364/142739125-dad73e22-c6c4-4c49-8367-3e5a278659e7.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

## Ease of Use

Make beautiful highlights in your notes to supplement your note-taking. The colors included were chosen to be universal across themes, in both light and dark mode. The use of inline CSS is essential in maintaining the longevity of your notes. When you export, you will not be reliant on any external CSS styling. This will make your notes much more flexible!

## How it Works

Although the plugin supplies you with a beautiful assortment of colors, you are free to customize your highlighter menu as you wish! Create new highlighter colors by openning the plugin settings tab. There, you will see an input, color picker and an `save` button. Use the input to set the name of your brand new highlight, then use the color picker to pick the color for said highlight. Then use the `save` button to save the new highlight into your highlighter menu.

<img src="https://user-images.githubusercontent.com/79069364/142739491-f6f75912-8689-4eef-a10e-67a820471d3c.png" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

<img src="https://user-images.githubusercontent.com/79069364/142739119-be46413e-905a-47bb-a23b-a63babc586e1.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

Obsidian app version 12.8 adds a powerful custom context menu for easier note-taking. This plugin adds 2 menu items: Highlight and Unhighlight. These menu items can only be seen on text selection. Clicking "Highlight" will trigger the highlighting menu, allowing you to choose from an assortment of colors. When you choose a color, your selected text will then be wrapped within HTML mark tags, including a color for the background that corresponds with the color you have chosen. Clicking "Unhighlight" will replace text that is within the string `<`, `/>`. That means that you can use this to remove HTML markings, and not just highlight marks.

<img alt="highlightr-demo" src="https://user-images.githubusercontent.com/79069364/144176804-c63a7e8d-f27c-48a6-bfeb-484cfe7d44e6.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

<img src="https://user-images.githubusercontent.com/79069364/142739490-e6824979-c339-449e-88c2-051979b7a6aa.png" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

You can also use the new command added in version [1.0.0]() to open your highlighlighter menu. Now, you can open your highlighting menu with a hotkey of your choosing. You will be able to add hotkeys to each individual highlighter color from your highlighter menu, as the plugin creates command for each highlighter as well.

<img src="https://user-images.githubusercontent.com/79069364/142739122-aed7a0ee-e7d8-4595-90f5-9e809f44ef04.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

<img src="https://user-images.githubusercontent.com/79069364/142739489-8f1e3243-f07a-4b40-a9d7-9c36dd3a784b.png" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

Version [1.1.2]() add the ability to choose between inline CSS and CSS classes. This will create a new stylesheet that will how all of your highlight colors. Each class is named `hltr-${highlight_title_here}` and are generated from the titles by which you have named your highlights. Although inline CSS is highly encouraged, CSS classes will make your highlights much more flexible and easier to customize.

## Disclaimer

The plugin component will not work with [cMenu plugin](https://github.com/chetachiezikeuzor/cMenu-Plugin).

## Installation

This plugin is not yet available in the Obsidian community plugin store. You can install it from there once it has been accepted. For a manual installation, you can download the necessary files and place them within your plugins folder.

---

## Changelog

### [1.0.0](https://github.com/chetachiezikeuzor/Highlightr-Plugin/releases/tag/1.0.0) - Oct 10, 2021

##### Added

- Added new setting to customize highlighter colors.
  <img src="https://user-images.githubusercontent.com/79069364/142739119-be46413e-905a-47bb-a23b-a63babc586e1.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">
- Added command to open highlighter palette
- Added function to add commands per highlighter
  <img src="https://user-images.githubusercontent.com/79069364/142739122-aed7a0ee-e7d8-4595-90f5-9e809f44ef04.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

### [1.0.1](https://github.com/chetachiezikeuzor/Highlightr-Plugin/releases/tag/1.0.1) - Oct 12, 2021

##### Added

- Function to remove commands automatically from command library after color deletion.

##### Fixed

- Bug: Check added to see that activeView isn't null

### [1.1.0](https://github.com/chetachiezikeuzor/Highlightr-Plugin/releases/tag/1.1.0) - Oct 14, 2021

##### Added

- Added command to remove highlight (`<mark>`)
  <img src="https://user-images.githubusercontent.com/79069364/142739131-b7bd43da-7d76-4c51-bd21-935f0adf5807.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

##### Changed

- Updated undo highlight functionality
  <img alt="undohighlight" src="https://user-images.githubusercontent.com/79069364/144176697-379340a7-da36-485e-91ed-853dbfde5ab6.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">
- Creating empty highlight now adds space at the end
  <img alt="addedspace" src="https://user-images.githubusercontent.com/79069364/144176500-79484143-b329-488b-855d-c46a42ece35c.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

### [1.1.1](https://github.com/chetachiezikeuzor/Highlightr-Plugin/releases/tag/1.1.1) - Oct 15, 2021

##### Changed

- Updated logic to cursor repositioning
  <img alt="betterCursorPos" src="https://user-images.githubusercontent.com/79069364/144176292-4df0ef0f-5478-4a31-9266-1852e7189026.gif" style=" box-shadow: 0 2px 8px 0 var(--background-modifier-border); border-radius: 8px; ">

---

## Checklist

- [x] Highlighter color commands
- [x] Open highlighter palette with command
- [x] Unhighlight with command
- [x] Undo highlight functionality
- [x] Customize highlighter colors
- [x] CSS classes setting

---

## Support

If you like this Plugin and are considering donating to support continued development, use the button below!

Created with ❤️ by Chetachi

<a href="https://www.buymeacoffee.com/chetachi"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&amp;emoji=&amp;slug=chetachi&amp;button_colour=e3e7ef&amp;font_colour=262626&amp;font_family=Inter&amp;outline_colour=262626&amp;coffee_colour=ff0000"></a>

<a href="https://paypal.me/chelseaezikeuzor">
<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/paypal.svg" height="70"></a>
<br/>
<a href="https://ko-fi.com/chetachi">
<img src="https://raw.githubusercontent.com/chetachiezikeuzor/Highlightr-Plugin/master/assets/kofi_blue.svg" height="50"></a>
