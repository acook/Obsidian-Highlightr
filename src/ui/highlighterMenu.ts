import { Menu, Notice } from "obsidian";
import { HighlightrSettings } from "src/settings/settingsData";
import {
  Coords,
  EnhancedApp,
  EnhancedEditor,
  EnhancedMenu,
} from "src/settings/types";

const highlighterMenu = (
  app: EnhancedApp,
  settings: HighlightrSettings,
  editor: EnhancedEditor
): void => {
  if (editor && editor.hasFocus()) {
    const cursor = editor.getCursor("from");
    let coords: Coords;

    const menu = new Menu() as unknown as EnhancedMenu;

    const menu = new Menu(plugin.app);
    (menu as any).dom.addClass('highlighterContainer');

    settings.highlighterOrder.forEach((highlighter) => {
      menu.addItem((item) => {
        item.setTitle(highlighter);
        item.setIcon(`highlightr-pen-${highlighter}`.toLowerCase());
        item.onClick(() => {
          (app as any).commands.executeCommandById(`highlightr-plugin:${highlighter}`);
        });
      });
    });

    if (editor.cursorCoords) {
      coords = editor.cursorCoords(true, "window");
    } else if (editor.coordsAtPos) {
      const offset = editor.posToOffset(cursor);
      coords = editor.cm.coordsAtPos?.(offset) ?? editor.coordsAtPos(offset);
    } else {
      return;
    }

    menu.showAtPosition({
      x: coords.right + 25,
      y: coords.top + 20,
    });
  } else {
    new Notice("Focus must be in editor");
  }
};

export default highlighterMenu;
