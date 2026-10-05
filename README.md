# Ariv Better Themes

A dark Visual Studio Code theme, customized from [Ariv Themes](https://github.com/ComputerKeeda/Ariv-Themes) by Shubham Sharma ([ComputerKeeda](https://github.com/ComputerKeeda)).

The original project is a modern dark theme for VS Code, in the same family as Vira and Material themes. This edition keeps that base and adjusts the workbench chrome: tabs, sidebar, status bar, and notifications use one navy and teal palette instead of the default VS Code blue and gray.

The extension id is `ariv-better-themes`. Two variants are included:

- **Ariv Better Ocean** uses `#0f111a` for the editor, sidebar, and tab bar.
- **Ariv Better Dark** uses `#191d1f` for those same surfaces.

Theme files:

- `themes/ariv-better-ocean-color-theme.json`
- `themes/ariv-better-dark-color-theme.json`

Syntax colors are unchanged from the original theme.

## Workbench colors

These colors are set in both variants.

| Surface | Color |
| --- | --- |
| Active tab underline | `#9EF2F6` |
| Tab separators, sidebar border, auxiliary bar border | `#191a21` |
| Selected list item and sidebar section headers | `#212639` |
| List hover | `#2A314C` |
| Status bar | `#1B333C` |
| Notifications | `#212639` with border `#3A5568` |
| Buttons and notification actions | `#1F6A74` |

The active tab underline is the workbench's own 1px bottom border, drawn under the label rather than through the text. Tab separators are a 1px right border.

## What the extension changes

When Ariv Better Dark or Ariv Better Ocean is active, the extension writes these global settings and restores the previous values when you switch away:

- `editor.fontFamily` to [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono), with Consolas and Courier New as fallbacks
- `editor.fontLigatures`
- `editor.bracketPairColorization.enabled`
- `editor.guides.bracketPairs`
- `workbench.iconTheme` to `material-icon-theme`
- `workbench.productIconTheme` to `feather-product-icons`

Ligatures appear only when JetBrains Mono is installed. The extension also recommends the [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) and [Feather Product Icons](https://marketplace.visualstudio.com/items?itemName=Melishev.feather-product-icons) packs.

## Install

1. Clone this repository.
2. Copy the folder into your VS Code extensions directory:
   - Linux and macOS: `~/.vscode/extensions/ariv-better-themes`
   - Windows: `%USERPROFILE%\.vscode\extensions\ariv-better-themes`
3. Reload the window (**Developer: Reload Window**).
4. Open the Command Palette and run **Preferences: Color Theme**.
5. Choose **Ariv Better Ocean** or **Ariv Better Dark**.

To drop the automatic font and icon settings, switch to any other color theme, then disable or uninstall the extension. Switching away restores the settings that were saved before Ariv Better Themes was applied.

## Credits

- Theme: [Ariv Themes](https://github.com/ComputerKeeda/Ariv-Themes) by Shubham Sharma. Copyright (c) 2026 shubhamsharma. See [LICENSE](LICENSE).
- Font: [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) by The JetBrains Mono Project Authors, [SIL Open Font License 1.1](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt).
