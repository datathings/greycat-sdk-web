import { GuiElement } from '../../exports.js';

export abstract class GuiMapElement extends GuiElement {
  onLoad(_map: maplibregl.Map): void {
    /*noop*/
  }
}
